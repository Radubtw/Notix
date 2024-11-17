import mongoose from 'mongoose';

const professorSchema = new mongoose.Schema({
    name : {type: String, require: true},
    surname : {type: String, require: true},    
})

const professorModel = mongoose.models.professor || mongoose.model("professor", professorSchema);
export default professorModel;