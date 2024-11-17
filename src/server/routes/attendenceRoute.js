import express from 'express';
import { addAbsence, listAbsences} from '../controllers/attendenceController.js'
const attendenceRouter = express.Router();

attendenceRouter.post("/add", addAbsence);
attendenceRouter.get("/list", listAbsences);

export default attendenceRouter;