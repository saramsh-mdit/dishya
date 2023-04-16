import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParse from 'cookie-parser';

dotenv.config();

import Router from './routers/index';
import { AppDataSource } from './data-source';
// import AuthMiddleware from './middleware/authMiddleware';

const server = express();

AppDataSource.initialize()
  .then((d) => {
    console.log('Database Connected');
  })
  .catch((error) => console.log(error));

server.use(express.static('public'));
server.use(express.json());
server.use(cookieParse());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(helmet());
server.use('/', Router);

export default server;
