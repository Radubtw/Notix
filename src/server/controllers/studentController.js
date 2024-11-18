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

const getStudentCourses = async (req, res) => {
    const { studentId } = req.body; // Get studentId from request body

    if (!studentId) {
        return res.status(400).json({ success: false, message: 'Student ID is required' });
    }
    try {
        const student = await studentModel.findById(studentId).populate('courses');
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.json({
            success: true,
            courses: student.courses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching student courses' });
    }
};

const addStudent = async (req, res) => {
    console.log('Request object: ', req);
    console.log('Response object: ', res);
    const {name, surname, birthDate, year, courses, email, password } = req.body;

    // Ensure courses are formatted correctly
    const student = new studentModel({
        name,
        surname,
        birthDate: new Date(birthDate),
        year: parseInt(year, 10), 
        courses: courses,
        email,
        password
    });

    try {
        await student.save();
        res.json({ success: true, message: "Student Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
export {listStudents, addStudent, listCourseStudents, getStudentCourses}