const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require("../config")

const generateAccessToken = (id,roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn:"24h"})
}




class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации' });
            }
            const { username, firstname, surname, fathername, password, roles, group } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь существует' });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({ username, firstname, surname, fathername, password: hashPassword, roles,group:"ПИ" });
            await user.save();
            return res.json({ message: 'Successfull add user' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Error Registration' });
        }
    }

    async login(req, res) {
        try {
           const {username,password} = req.body
           const user = await User.findOne({username})
           if (!user){
                return res.status(400).json({message:`Пользователь ${username} не найден`})
           }
           const validPassword = bcrypt.compareSync(password, user.password)
           if (!validPassword) {
            return res.status(400).json({message:`Пароль неверный`})

           }
           const token = generateAccessToken(user._id,user.roles)
           return res.json({token})
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Error Login' });
        }
    }


    async getUsers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;

            const users = await User.find().select('-password').skip(skip).limit(limit);

            res.json(users);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Error fetching users' });
        }
    }
    async getUserByToken(req, res) {
        try {
          const token = req.headers.authorization.split(' ')[1]; // Получите токен из заголовка запроса
          if (!token) {
            return res.status(401).json({ message: 'Токен отсутствует' });
          }
    
          const decodedData = jwt.verify(token, secret);
          const userId = decodedData.id;
    
          const user = await User.findById(userId).select('-password');
          if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
          }
    
          res.json(user);
        } catch (e) {
          console.error(e);
          res.status(401).json({ message: 'Ошибка аутентификации' });
        }
      }
    }


module.exports = new AuthController();