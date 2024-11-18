import express from 'express';
import { login, logout } from '../login/loginController.js'
const loginStudentouter = express.Router();

loginStudentouter.post("/login", login);
loginStudentouter.post("/logout", logout);
export default loginStudentouter;
