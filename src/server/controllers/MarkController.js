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
    try {
        const marks = await markModel.find({courseId : req.body.courseId, studentId : req.body.userId});
        console.log(marks);
        res.json({ success: true, marks: marks });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching marks" });
    }
};

const listAverage = async (req, res) => {
    try {
        const { courseIds } = req.body;

        if (!courseIds || !Array.isArray(courseIds)) {
            return res.status(400).json({ error: 'Invalid or missing courseIds' });
        }

        // Calculate the average marks per courseId
        const averages = await markModel.aggregate([
            {
                $match: {
                    courseId: { $in: courseIds } // No need for ObjectId since courseId is a String
                },
            },
            {
                $group: {
                    _id: '$courseId',
                    averageMark: { $avg: '$mark' },
                },
            },
        ]);

        res.status(200).json({ averages });
    } catch (error) {
        console.error('Error calculating averages:', error);
        res.status(500).json({ error: 'Failed to calculate averages' });
    }
};

export {addMark, listMarks, listAverage};