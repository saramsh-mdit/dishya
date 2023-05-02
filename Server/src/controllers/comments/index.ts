import { Router } from "express";

import logger from "../../utils/logger/index";
import { getComments, addComment, deleteComment } from "./comment.service";
import AuthMiddleware from "../../middleware/authMiddleware";

const CommentController = Router();

CommentController.get("/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId as string;
    const data = await getComments(videoId);
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

CommentController.post("/", AuthMiddleware, async (req, res) => {
  try {
    const userId = res.locals.userId as string;
    const { videoId, comment } = req.body;
    const data = await addComment(userId, videoId, comment);
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

CommentController.delete("/:id", AuthMiddleware, async (req, res) => {
  try {
    const commentId = req.params.id as string;
    const userId = res.locals.userId;
    const data = await deleteComment(userId, commentId);
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

export default CommentController;
