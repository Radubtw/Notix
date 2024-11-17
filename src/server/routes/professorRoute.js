import express from 'express';
import { listProfessors, addProfessor } from '../controllers/professorController.js';

const professorRouter = express.Router();

professorRouter.get("/list", listProfessors);
professorRouter.post("/add", addProfessor);
export default professorRouter;