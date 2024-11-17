import mongoose from 'mongoose';
import { ObjectId } from 'mongodb'

const studentSchema = new mongoose.Schema({
    name : {type: String, require: true},
    surname : {type: String, require: true},
    birthDate : {type: Date},
    year: {type: Number, require: true},
    
    courses: [{ type: ObjectId, require: true }]
})

const studentModel = mongoose.models.student || mongoose.model("student", studentSchema);
export default studentModel;