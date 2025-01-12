import courseModel from '../models/courseModel.js'

const addCourse = async (req, res) => {
    console.log('Request object: ', req);
    console.log('Response object: ', res);
    const {name, year, professorName} = req.body;

    const course = new courseModel({
        name,
        year,
        professorName
    });

    try {
        await course.save();
        res.json({ success: true, message: "Course Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const listCourses = async (req, res) => {
    console.log('Request object:', req); 
    console.log('Response object:', res);
    try {
        const courses = await courseModel.find({});
        res.json({ success: true, data: courses });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching courses" });
    }
};

const listStudentCourses = async (req, res) => {
    console.log('Request object:', req); 
    console.log('Response object:', res);
    console.log('reqIDs', req.body.courseIds);
    try {
        const courses = await courseModel.find(
            { _id: { $in: req.body.courseIds } },
            '_id name professorName year' 
        );
        console.log("courses-controller:", courses);
        res.json({ success: true, courses });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching courses" });
    }
};




export {addCourse, listCourses, listStudentCourses};