const express = require('express');
const { check } = require('express-validator');
const gradeController = require('../controllers/gradeController');

const router = express.Router();


router.post('/createGrade', [
    check('subject', "Предмет не может быть пустым").notEmpty(),
    check('value', "Значение оценки не может быть пустым").notEmpty(),
    check('userId', "ID пользователя не может быть пустым").notEmpty(),
], gradeController.createGrade);

router.get('/getGradesByUsername/:username', gradeController.getGradesByUsername);
router.get('/getGradesByUsernameAndSubject/:username/:subject?', gradeController.getGradesByUsernameAndSubject);

module.exports = router;