import studentModel from '../models/studentModel.js';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const student = await studentModel.findOne({ email });
        if (!student) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Direct password comparison
        if (student.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Store student ID in session
        req.session._id = student._id;

        return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to log out' });
        }

        res.clearCookie('cookie'); // Clear the session cookie
        return res.status(200).json({ message: 'Logout successful' });
    });
};

export {login, logout};
