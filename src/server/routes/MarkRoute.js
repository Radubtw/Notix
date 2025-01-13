import express from 'express';
import { addMark, listMarks, listAverage } from '../controllers/MarkController.js';

const markRouter = express.Router();

markRouter.post("/add", addMark);
markRouter.post("/list", listMarks);
markRouter.post('/listAverage', listAverage);

export default markRouter;
