import studentModel from '../models/studentModel.js'

const listStudents = async (req, res) => {
    console.log('Request object:', req); // Should log the request object
    console.log('Response object:', res); // Should log the response object
    try {
        const students = await studentModel.find({});
        res.json({ success: true, data: students });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching students" });
    }
};

const listCourseStudents = async (req, res) => {
    console.log('Request object:', req); // Should log the request object
    console.log('Response object:', res); // Should log the response object
    try {
        const students = await studentModel.find({courses : req.body.courseId});
        res.json({ success: true, data: students });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching students" });
    }
};

const addStudent = async (req, res) => {
    console.log('Request object: ', req);
    console.log('Response object: ', res);
    const {name, surname, birthDate, year, courses } = req.body;

    // Ensure courses are formatted correctly
    const student = new studentModel({
        name,
        surname,
        birthDate: new Date(birthDate),
        year: parseInt(year, 10), 
        courses: courses,
    });

    try {
        await student.save();
        res.json({ success: true, message: "Student Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
export {listStudents, addStudent, listCourseStudents}