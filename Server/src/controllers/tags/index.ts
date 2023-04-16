import { Router } from "express";

import logger from "../../utils/logger";
import { getTags, postTag } from "./tags.service";

const TagsController = Router();

TagsController.get('/', async (req,res)=> {
  try {
        const data = await getTags();
        res.status(200).send(data);
    } catch (err) {
      logger.error(err);
      res.status(404).send(err);
    }
})

TagsController.post('/', async (req,res)=> {
    try {
        const {name} = req.body;
        const data = await postTag(name);
        res.status(200).send(data);
    } catch (err) {
      logger.error(err);
      res.status(404).send(err);
    }
})

export default TagsController;