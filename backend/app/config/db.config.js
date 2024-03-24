var dbProperties = {
    database: process.env.DB_NAME, // название базы данных
    username: process.env.DB_USER, // имя пользователя, для которого настроены права к базе данных, 'root' задаётся по умолчанию
    password: process.env.DB_PASSWORD, // пароль пользователя, по умолчанию пароль пустой
    host: process.env.DB_HOST, // имя сервера, на котором расположена база данных
    port: process.env.DB_PORT,
    dialect: 'mysql', // используемая СУБД
    pool: { // параметры соединения
        max: 5, // максимальное количество одновременно открытых соединений
        min: 0, // минимальное количество соединений
        acquire: 30000, // максимальное время в миллисекундах, в течение которого пул (набор соединений к БД) будет пытаться установить соединение, прежде чем выдаст ошибку
        idle: 10000 // время в миллисекундах, в течение которого соединение может простаивать, прежде чем оно будет удалено
    }
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    dbProperties.database, dbProperties.username, dbProperties.password,
    {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        define: {
            // имена таблиц не будут создаваться автоматически во множественном числе
            freezeTableName: true,

            // запрет на автоматическое создание полей createdAt и updatedAt (эти поля по умолчанию создаются ORM Sequalize во всех таблицах, при желании можете включить эту настройку)
            timestamps: false
        }
    }
);

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Подключение моделей
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.product_category = require('../model/product_category.model.js')(sequelize, Sequelize);
db.product = require('../model/product.model.js')(sequelize, Sequelize);
db.order_product = require('../model/order_product.model.js')(sequelize, Sequelize);
db.order = require('../model/order.model.js')(sequelize, Sequelize);

// Связывание моделей без импорта файлов (то есть, чтобы в файле описания любой модели можно было
// обращаться к другим моделям по имени без необходимости импорта в виде require(...))
Object.keys(db).forEach(key => {
    if (db[key] && db[key].associate) {
        db[key].associate(db);
    }
});

module.exports = db;