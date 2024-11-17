import mongoose from 'mongoose';
import { ObjectId } from 'mongodb'

const courseSchema = new mongoose.Schema({
    name : {type: String, require: true},
    year : {type: Number, require: true},
    professorId : {type: ObjectId, require: true}

})

const courseModel = mongoose.models.course || mongoose.model("course", courseSchema);
export default courseModel;