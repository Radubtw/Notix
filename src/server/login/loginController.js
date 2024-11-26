import studentModel from '../models/studentModel.js';
import professorModel from '../models/professorModel.js';

const login = async (req, res) => {
    const { email, password, isProfessor } = req.body;
    if(isProfessor === "false")
    {
        try {

            const student = await studentModel.findOne({ email });
            if (!student) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            if (student.password !== password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            req.session._id = student._id;

            return res.status(200).json({ message: 'Login successful' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    else{
        try {
            const professor = await professorModel.findOne({ email });
            if (!professor) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            if (professor.password !== password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            req.session._id = professor._id;

            return res.status(200).json({ message: 'Login successful' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to log out' });
        }

        res.clearCookie('cookie'); 
        return res.status(200).json({ message: 'Logout successful' });
    });
};

const sessionChecker = (req, res) => {
    const user = {
        id: req.session._id
    }
    if (req.session && req.session._id) {
        return res.status(200).json({message: 'Succes = true', user});
    } else {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
};

export {login, logout, sessionChecker};
