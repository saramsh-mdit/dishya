import { Router } from "express";

import UserController from "../controllers/user";
import VideoController from "../controllers/video";
import TagsController from "../controllers/tags";
import AuthMiddleware from "../middleware/authMiddleware";

const PrivateApiRouter = Router();

PrivateApiRouter.use(AuthMiddleware);
PrivateApiRouter.use("/user", UserController);
PrivateApiRouter.use("/video", VideoController);
PrivateApiRouter.use("/tags", TagsController);
// PrivateApiRouter.use(AuthMiddleware);

export default PrivateApiRouter;
