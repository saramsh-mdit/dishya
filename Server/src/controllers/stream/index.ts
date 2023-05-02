import fs from "fs";
import fsPromise from "fs/promises";
import { Router } from "express";

import { getLiveVideos, getVideoById } from "../video/video.service";
import {
  getRecommendataion,
  getSearchResult,
  increaseViews,
} from "./stream.service";
import logger from "../../utils/logger";

const StreamController = Router();

StreamController.get("/search/:query", async (req, res) => {
  try {
    const queryString = req.params.query;
    const data = await getSearchResult(queryString);
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

StreamController.get("/:id", async (req, res) => {
  try {
    const id = req.params.id as string;
    const data = await getVideoById(id);
    const videoPath = `${__dirname}/../../../public/uplodedData/${data?.videoInfo?.filename}`;
    const videoStat = await fsPromise.stat(videoPath);
    const fileSize = videoStat.size;
    const videoRange = req.headers.range;

    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });

      const header = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, header);
      file.pipe(res);
    } else {
      await increaseViews(id);
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

StreamController.get("/", async (_, res) => {
  try {
    const data = await getLiveVideos();
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

StreamController.get("/recommendation/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getRecommendataion(id);
    res.status(200).send(data);
  } catch (err) {
    logger.error("Error", err);
    res.status(404).send(err);
  }
});

export default StreamController;
