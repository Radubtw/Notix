import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {connectDB} from "./db.js"
import studentRouter from "./routes/studentRoute.js"
import markRouter from './routes/MarkRoute.js';
import attendenceRouter from './routes/attendenceRoute.js';
import professorRouter from './routes/professorRoute.js';
import courseRouter from './routes/courseRoute.js';
import loginStudentRouter from './login/loginRoute.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials:true}));

connectDB();

app.use(session({
    name: 'cookie',
    secret: 'key',
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://radubtw30:bestfoodever@notix.3epxx.mongodb.net/'
    })
}));

app.use("/api/students", studentRouter);
app.use("/api/marks", markRouter);
app.use("/api/attendence", attendenceRouter);
app.use("/api/professors", professorRouter);
app.use("/api/courses", courseRouter);
app.use("/api/session", loginStudentRouter);

app.get("/", (req, res) => {
    res.send("API WORKING")
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
