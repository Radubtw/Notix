import attendenceModel from "../models/attendenceModel.js";

const addAbsence = async (req, res) => {
    console.log('Request object: ', req);
    console.log('Response object: ', res);
    const {courseId, studentId, date} = req.body;

    const absence = new attendenceModel({
        courseId,
        studentId,
        date : new Date(date)
    });

    try {
        await absence.save();
        res.json({ success: true, message: "Absence Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const listAbsences = async (req, res) => {
    console.log('Request object:', req); 
    console.log('Response object:', res);
    try {
        const absences = await attendenceModel.find({studentId : req.body.userId});
        res.json({ success: true, absences: absences });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching marks" });
    }
};


export {addAbsence, listAbsences};