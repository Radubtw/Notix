import professorModel from '../models/professorModel.js'

const listProfessors = async (req, res) => {
    console.log('Request object:', req); 
    console.log('Response object:', res); 
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
    const {name, surname, email, password } = req.body;

    const professor = new professorModel({
        name,
        surname,
        email,
        password
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