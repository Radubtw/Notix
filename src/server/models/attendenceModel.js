import mongoose from 'mongoose';

const attendenceSchema = new mongoose.Schema({
    courseId: {type: String, require: true},
    studentId: {type: String, require: true},
    date: {type: Date, require: true}
})

const attendenceModel = mongoose.models.attendence || mongoose.model("attendence", attendenceSchema);
export default attendenceModel;