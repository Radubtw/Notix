import professorModel from '../models/professorModel.js'

const listProfessors = async (req, res) => {
    console.log('Request object:', req); // Should log the request object
    console.log('Response object:', res); // Should log the response object
    try {
        const professors = await professorModel.find({});
        res.json({ success: true, data: professors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching professors" });
    }
};


const addProfessor = async (req, res) => {
    console.log('Request object: ', req);
    console.log('Response object: ', res);
    const {name, surname } = req.body;

    // Ensure courses are formatted correctly
    const professor = new professorModel({
        name,
        surname
    });

    try {
        await professor.save();
        res.json({ success: true, message: "Professor Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
export {listProfessors, addProfessor}