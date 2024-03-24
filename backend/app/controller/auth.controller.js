var db = require("../config/db.config");
var config = require("../config/auth.config");
var User = db.user;
var globalFunctions = require('../config/global.functions.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    console.log("au con");
    User.create({
        name: req.body.name,
        address: req.body.address,                // 2 cst
        bonus_money: req.body.bonus_money,
        password: bcrypt.hashSync(req.body.password, 10), // генерация хеша пароля
   
    })
        .then(() => {
            
            var result = {
                message: "Пользователь зарегистрирован"
            };
            globalFunctions.sendResult(res, result);
        })
        .catch(err => {
            
            globalFunctions.sendError(res, err);
        });
};

exports.login = (req, res) => {
    User.findOne({
        where: {
            name: req.body.name
        }
    })
        .then(user => {
            if (!user) {
                res.status(404).send({ message: "Неверно введенный логин и/или пароль" });
                return;
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password,
                req.body.admin,
                user.admin,
            );
            if (!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Неверно введенный логин и/или пароль"
                });
                return;
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 28800 // 8 часов — время действия токена
            });

            var object = {
                id: user.id,
                name: user.name,
                address: user.address,
                bonus_money: user.bonus_money,
                admin: user.admin,
                accessToken: token
            };
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.userBoard = (req, res) => {
    globalFunctions.sendResult(res, "Пользователь авторизован");
};