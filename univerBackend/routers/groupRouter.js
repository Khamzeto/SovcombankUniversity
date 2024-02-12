// groupRouter.js
const express = require('express');
const { check } = require('express-validator');
const groupController = require('../controllers/groupController');

const router = express.Router();

router.post('/createGroup', [
    check('groupname', "Имя группы не может быть пустым").notEmpty(),
], groupController.createGroup);

router.post('/addUsersToGroup', [
    check('groupName', "ID группы не может быть пустым").notEmpty(),
    check('usernames', "Массив имен пользователей не может быть пустым").isArray().notEmpty(),
], groupController.addUsersToGroup);


router.get('/getUsersInGroup/:groupname', groupController.getUsersInGroup);


router.get('/getAllGroupNames', groupController.getAllGroupNames);



module.exports = router;
