const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const scheduleController = require('../controllers/scheduleController');

router.post('/create', [
    check('days').isArray().withMessage('Дни должны быть предоставлены'),
    // Добавьте дополнительные проверки по необходимости
], scheduleController.createSchedule);

router.get('/:groupname', scheduleController.getScheduleByGroup);

module.exports = router;
