
const Group = require('../models/Group');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const createGroup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { groupname } = req.body;

        const newGroup = new Group({
            groupname,
        });

        await newGroup.save();

        res.status(201).json({ message: 'Группа успешно создана', groupname: newGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: error.message });
    }
};

const addUsersToGroup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { groupName, usernames } = req.body;

        const group = await Group.findOne({ groupname: groupName });
        if (!group) {
            return res.status(404).json({ message: 'Группа не найдена' });
        }

        // Поиск пользователей по именам
        const users = await User.find({ username: { $in: usernames } });

        // Проверка, что все пользователи найдены
        if (users.length !== usernames.length) {
            return res.status(404).json({ message: 'Не все пользователи найдены' });
        }

        // Убедимся, что group.users определен и это массив
        if (!group.users) {
            group.users = [];
        }

        // Добавить пользователей в массив пользователей группы
        group.users = group.users.concat(users);

        // Сохранить изменения в группе
        await group.save();

        // Обновить информацию о группе в каждом пользователе
        for (const user of users) {
            user.group = group.groupname;
            await user.save();
        }

        res.status(200).json({ message: 'Пользователи добавлены в группу', group });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: error.message });
    }
};



const getUsersInGroup = async (req, res) => {
    try {
        const { groupname } = req.params;

        const group = await Group.findOne({ groupname }).populate('users');
        if (!group) {
            return res.status(404).json({ message: 'Группа не найдена' });
        }

        if (!group.users || group.users.length === 0) {
            return res.status(404).json({ message: 'Нет пользователей в группе' });
        }

        res.status(200).json({ users: group.users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: error.message });
    }
};



const getAllGroupNames = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const allGroups = await Group.find({}, 'groupname').skip(skip).limit(limit);

        if (!allGroups || allGroups.length === 0) {
            return res.status(404).json({ message: 'Группы не найдены' });
        }

        const groupNames = allGroups.map(group => group.groupname);

        res.status(200).json({ groupNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: error.message });
    }
};



module.exports = {
    createGroup,
    addUsersToGroup,
    getUsersInGroup,
    getAllGroupNames,
};
