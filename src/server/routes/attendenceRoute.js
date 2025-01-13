import express from 'express';
import { addAbsence, listAbsences} from '../controllers/attendenceController.js'
const attendenceRouter = express.Router();

attendenceRouter.post("/add", addAbsence);
attendenceRouter.post("/list", listAbsences);

export default attendenceRouter;