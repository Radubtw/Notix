import mongoose from 'mongoose';
import { ObjectId } from 'mongodb'

    const studentSchema = new mongoose.Schema({
        name : {type: String, require: true},
        surname : {type: String, require: true},
        birthDate : {type: Date},
        year: {type: Number},
        timetable: {type: String},
        courses: [{ type: ObjectId}],
        email : {type: String, require: true},
        password: {type: String, require: true}
    })

const studentModel = mongoose.models.student || mongoose.model("student", studentSchema);
export default studentModel;