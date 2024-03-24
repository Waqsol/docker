var db = require('../config/db.config.js');
var ProductCategory = db.product_category;
var globalFunctions = require('../config/global.functions.js');
// Получение всех пользователей
var multiparty = require('multiparty');
var fs = require('fs');
var uuid = require('uuid');

exports.findAll = (req, res) => {
    ProductCategory.findAll()
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
            var priority = fields.priority[0];


            ProductCategory.create({
                name: name,
                priority: priority,
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
    ProductCategory.update({
            name: req.body.name,
            priority: req.body.priority,
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
    ProductCategory.destroy({
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
    ProductCategory.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
// Получение данных пользователя по username
exports.findByName = (req, res) => {
    ProductCategory.findAll({
        where: {
            name: req.params.name
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};