var db = require('../config/db.config.js');
var Order = db.order;
var globalFunctions = require('../config/global.functions.js');
// Получение всех пользователей

exports.findAll = (req, res) => {
    Order.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req, res) => {
    Order.create({
        date: req.body.date,
        user_id: req.body.user_id,
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
// Обновление данных пользователя по id
exports.update = (req, res) => {
    Order.update({
            date: req.body.date,
            user_id: req.body.user_id,
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
    Order.destroy({
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
    Order.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
