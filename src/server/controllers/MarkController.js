import markModel from '../models/MarkModel.js'

const addMark = async (req, res) => {
    console.log('Request object: ', req);
    console.log('Response object: ', res);
    const {courseId, studentId, mark, date} = req.body;

    const markObject = new markModel({
        courseId,
        studentId,
        mark,
        date : new Date(date)
    });

    try {
        await markObject.save();
        res.json({ success: true, message: "Mark Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const listMarks = async (req, res) => {
    console.log('Request object:', req); 
    console.log('Response object:', res);
    try {
        const marks = await markModel.find({courseId : req.body.courseId, studentId : req.body.studentId});
        res.json({ success: true, data: marks });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching marks" });
    }
};


export {addMark, listMarks};