const Schedule = require('../models/Schedule');
const { validationResult } = require('express-validator');
const { Group } = require('../models/Group'); // Уточните путь в соответствии с вашей структурой проекта



const createSchedule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { days } = req.body;

  try {
    if (!days || !Array.isArray(days) || days.length === 0 || !days[0].day || !days[0].classes) {
      throw new Error('Некорректные данные. Пожалуйста, предоставьте допустимые данные для создания расписания.');
    }

    const groupname = days[0].group;

    const scheduleData = {
      group: groupname, // используем название группы
      days: days.map(({ day, classes }) => ({ day, classes })),
    };

    await Schedule.create(scheduleData);

    res.status(201).json({ message: 'Расписание успешно создано' });
  } catch (error) {
    console.error('Ошибка при создании расписания:', error);
    res.status(500).json({ error: error.message }); // Вернуть детали ошибки в ответе
  }
};


  

const getScheduleByGroup = async (req, res) => {
  const { groupname } = req.params;

  try {
    const schedule = await Schedule.findOne({ group: groupname });
    
    if (!schedule) {
      return res.status(404).json({ message: 'Расписание не найдено для указанной группы' });
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.error('Ошибка при получении расписания:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSchedule,
  getScheduleByGroup,
};