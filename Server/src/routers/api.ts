import { Router } from "express";

import StreamController from "../controllers/stream";
import AuthController from "../controllers/auth";
import CommentController from "../controllers/comments";

const ApiRouter = Router();

ApiRouter.use("/stream", StreamController);
ApiRouter.use("/auth", AuthController);
ApiRouter.use("/comments", CommentController);

export default ApiRouter;
