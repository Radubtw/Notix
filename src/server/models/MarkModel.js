import mongoose from 'mongoose';

const markSchema = new mongoose.Schema({
    courseId: {type: String, require: true},
    studentId: {type: String, require: true},
    mark: {type: Number, require: true},
    date: {type: Date, require: true}
})

const markModel = mongoose.models.mark || mongoose.model("mark", markSchema);
export default markModel;