import express from 'express';
import { login, logout, sessionChecker } from '../login/loginController.js'
const loginStudentRouter = express.Router();

loginStudentRouter.post("/login", login);
loginStudentRouter.post("/logout", logout);
loginStudentRouter.get("/check-session", sessionChecker);
export default loginStudentRouter;
