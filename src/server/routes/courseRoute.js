import express from 'express';
import { addCourse, listCourses,listCourseByCourseId, listStudentCourses } from '../controllers/courseController.js';
const courseRouter = express.Router();

courseRouter.post("/add", addCourse);
courseRouter.get("/list", listCourses);
courseRouter.post("/listCourseByCourseId", listCourseByCourseId);
courseRouter.post("/listStudentCourses", listStudentCourses);

export default courseRouter;