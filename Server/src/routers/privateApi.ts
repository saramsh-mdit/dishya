import { Router } from 'express';

import UserController from '../controllers/user';
import VideoController from '../controllers/video';
import TagsController from '../controllers/tags';
import CommentController from '../controllers/comments';
import AuthMiddleware from '../middleware/authMiddleware';

const PrivateApiRouter = Router();

PrivateApiRouter.use(AuthMiddleware)
PrivateApiRouter.use('/comments', CommentController);
PrivateApiRouter.use('/user', UserController);
PrivateApiRouter.use('/video', VideoController);
PrivateApiRouter.use('/tags', TagsController);
// PrivateApiRouter.use(AuthMiddleware);

export default PrivateApiRouter;
