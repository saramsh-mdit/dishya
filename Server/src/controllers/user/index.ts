import { Router } from 'express';

import logger from '../../utils/logger/index';
import { deleteUser, getUsers, getUser } from './users.service';

const UserController = Router();

UserController.get('/', async (_, res) => {
  try {
    const data = await getUsers();
    res.status(200).send();
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

UserController.get('/info', async (_, res) => {
  try {
    const userId = res.locals.userId;
    const data = await getUser(userId);
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

// UserController.get('/:name', async (req, res) => {
//   try {
//     const { name } = req.params;

//     const data = await getUser(name);
//     res.status(200).send(data);
//   } catch (err) {
//     logger.error(err);
//     res.sendStatus(404);
//   }
// });

UserController.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const data = await deleteUser(id);
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

export default UserController;
