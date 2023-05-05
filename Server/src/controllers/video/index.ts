import { Router } from "express";

import logger from "../../utils/logger/index";
import {
  addVideo,
  addVideoInfo,
  deleteVideo,
  getVideos,
} from "./video.service";
import uploadMiddleware from "../../middleware/uploadMiddleware";

const VideoController = Router();
// Get all Video
VideoController.get("/all", async (_, res) => {
  try {
    const data = await getVideos();
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

// Get a video
VideoController.get("/", async (_, res) => {
  try {
    const userId = res.locals.userId;
    const data = await getVideos(userId);
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

// Create Video
VideoController.post(
  "/",
  uploadMiddleware.single("image"),
  async (req, res) => {
    try {
      const image = { ...req.file };
      const { title, description, tags } = req.body;
      const userId = res.locals.userId;
      const data = await addVideo({ userId, title, description, tags }, image);
      res.status(200).send(data);
    } catch (err) {
      logger.error(err);
      res.status(404).send(err);
    }
  }
);

// Delete video
VideoController.delete("/:id", async (req, res) => {
  try {
    const id = req.params?.id;
    const data = await deleteVideo(id);
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

// Video File Upload
VideoController.post(
  "/upload",
  uploadMiddleware.single("video"),
  async (req, res) => {
    try {
      const fileData = { ...req.file };
      const videoId = req.body?.videoId;
      const result = await addVideoInfo({ fileData, videoId });
      res.send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

export default VideoController;
