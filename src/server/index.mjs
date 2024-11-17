import express from 'express';
import cors from 'cors';
import {connectDB} from "./db.js"
import studentRouter from "./routes/studentRoute.js"
import markRouter from './routes/MarkRoute.js';
import attendenceRouter from './routes/attendenceRoute.js';
import professorRouter from './routes/professorRoute.js';
import courseRouter from './routes/courseRoute.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/students", studentRouter);
app.use("/api/marks", markRouter);
app.use("/api/attendence", attendenceRouter)
app.use("/api/professors", professorRouter)
app.use("/api/courses", courseRouter)

app.get("/", (req, res) => {
    res.send("API WORKING")
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
