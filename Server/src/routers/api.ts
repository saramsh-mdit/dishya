import { Router } from 'express';

import UserController from '../controllers/user';
import VideoController from '../controllers/video';
import StreamController from '../controllers/stream';
import TagsController from '../controllers/tags';
import AuthController from '../controllers/auth';
import CommentController from '../controllers/comments';


const ApiRouter = Router();

ApiRouter.use('/stream', StreamController);
ApiRouter.use('/auth', AuthController);

export default ApiRouter;
