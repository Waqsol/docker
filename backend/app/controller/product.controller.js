var db = require('../config/db.config.js');
var Product = db.product;
var globalFunctions = require('../config/global.functions.js');
// Получение всех пользователей
var multiparty = require('multiparty');
var fs = require('fs');
var uuid = require('uuid');



exports.findAll = (req, res) => {
    Product.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = async (req, res) => {
    var form = new multiparty.Form();
    await form.parse(req, async (err, fields, files) => {
        if (!err) {
            var mimeType = files.link[0].headers['content-type']; // тип файла указывается так: image/png
            expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение

            var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
            var link1 = './files/' + newName;

            fs.rename(files.link[0].path, link1, (err) => {
                if (err) {
                    throw err;
                }
            });

            var name = fields.name[0];
            var category_id = fields.category_id[0];
            var price = fields.price[0];
            var bonus_price = fields.bonus_price[0];
            var discription = fields.discription[0];

            Product.create({
                name: name,
                category_id: category_id,
                price: price,
                bonus_price: bonus_price,
                discription: discription,
                link: newName,
                
            }).then(object => {
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        }
        else{
            globalFunctions.sendError(res, err);
        }
    });
};

// Обновление данных пользователя по id
exports.update = (req, res) => {
    Product.update({
        name: req.body.name,
        category_id: req.body.category_id,
        passwpriceord: req.body.price,
        bonus_price: req.body.bonus_price,
        discription: req.body.discription
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
    Product.destroy({
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
    Product.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findByCategory = (req, res) => {
    Product.findAll({
        where: {
            category_id: req.params.category_id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Получение данных пользователя по username
exports.findByName = (req, res) => {
    Product.findAll({
        where: {
            name: req.params.name
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};