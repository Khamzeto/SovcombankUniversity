const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 8").isLength({ min: 1, max: 30 })
], controller.registration);

router.post('/login', controller.login);

router.get('/users', controller.getUsers);

// Новый маршрут для получения данных пользователя по токену
router.get('/getUserByToken', authMiddleware, controller.getUserByToken);

module.exports = router;