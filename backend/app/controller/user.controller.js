var db = require('../config/db.config.js');
var User = db.user;
var globalFunctions = require('../config/global.functions.js');
// Получение всех пользователей
var { Op } = require("sequelize");
exports.findAll = (req, res) => {
    User.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req, res) => {
    User.create({
        name: req.body.name,
        address: req.body.address,
        bonus_money: req.body.bonus_money,
        password: req.body.password,
        admin: req.body.admin
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
// Обновление данных пользователя по id
exports.update = (req, res) => {
    User.update({
        name: req.body.name,
        address: req.body.address,
        bonus_money: req.body.bonus_money,
        password: req.body.password,
        admin: req.body.admin
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
// Удаление пользователя по id
exports.delete = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
// Получение данных пользователя по id
exports.findById = (req, res) => {
    User.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
// Получение данных пользователя по username

// Получение данных пользователя по name
exports.findUsersByName = (req, res) => {
    User.findAll({
        where: {
            name: { [Op.like]: `%${req.params.name}%` }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};