const express = require('express');
const router = express.Router();
const controller = require('../controllers/newsConroller');


router.get('/news', controller.getNewsList);

// Получение конкретной новости по id
router.get('/news/:id', controller.getNewsById);

// Добавление новости
router.post('/news', controller.addNews);

module.exports = router;
