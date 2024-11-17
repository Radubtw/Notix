import express from 'express';
import { addMark, listMarks } from '../controllers/MarkController.js'

const markRouter = express.Router();

markRouter.post("/add", addMark);
markRouter.get("/list", listMarks);

export default markRouter;