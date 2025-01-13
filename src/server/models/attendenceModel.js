import mongoose from 'mongoose';

const attendenceSchema = new mongoose.Schema({
    courseId: {type: String, require: true},
    courseName: {type: String, require: true},
    studentId: {type: String, require: true},
    date: {type: String, require: true}
})

const attendenceModel = mongoose.models.attendence || mongoose.model("attendence", attendenceSchema);
export default attendenceModel;