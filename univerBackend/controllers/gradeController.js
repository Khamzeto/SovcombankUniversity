const User = require('../models/User');
const Grade = require('../models/Grade');

const createGrade = async (req, res) => {
    try {
      const gradesData = req.body;
  
      // Map through the array of grades and process each one
      const createdGrades = await Promise.all(gradesData.map(async (grade) => {
        const { subject, value, userId } = grade;
  
        const user = await User.findOne({ username: userId });
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        const newGrade = new Grade({
          subject,
          value,
          user: user._id,
        });
  
        const savedGrade = await newGrade.save();
  
        return savedGrade;
      }));
  
      res.status(201).json(createdGrades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };
  

const getGradesByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const grades = await Grade.find({ user: user._id });

        res.status(200).json(grades);
    } catch (error) {
        console.error('Error fetching grades by username:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getGradesByUsernameAndSubject = async (req, res) => {
    try {
        const { username, subject } = req.params;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        const query = { user: user._id };
        if (subject) {
            query.subject = subject;
        }

        const grades = await Grade.find(query);

        res.status(200).json(grades);
    } catch (error) {
        console.error('Error fetching grades by username and subject:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getGradesByUsernameAndSubject,
    createGrade,
    getGradesByUsername,
};
