var db = require('../config/db.config.js');
var OrderProduct = db.order_product;
var globalFunctions = require('../config/global.functions.js');
// Получение всех пользователей

exports.findAll = (req, res) => {
    OrderProduct.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req, res) => {
    OrderProduct.create({
        product_id	: req.body.product_id	,
        order_id: req.body.order_id,
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
// Обновление данных пользователя по id
exports.update = (req, res) => {
    OrderProduct.update({
            product_id: req.body.product_id,
            order_id: req.body.order_id,
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
    OrderProduct.destroy({
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
    OrderProduct.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
