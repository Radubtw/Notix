import express from 'express';
import { listStudents, listCourseStudents, addStudent, getStudentCourses } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.get("/list", listStudents);
studentRouter.get("/listCourseStudents", listCourseStudents);
studentRouter.post("/add", addStudent);
studentRouter.post("/getStudentCourses", getStudentCourses);
export default studentRouter;