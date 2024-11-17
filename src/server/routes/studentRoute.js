import express from 'express';
import { listStudents, listCourseStudents, addStudent } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.get("/list", listStudents);
studentRouter.get("/listCourseStudents", listCourseStudents);
studentRouter.post("/add", addStudent);
export default studentRouter;