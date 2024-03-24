var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false});

// Указание, что каталог files используется для хранения статических файлов
app.use(express.static("files"));

app.listen(3000);
var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200', // указываем, откуда будут приходить запросы
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));
var user = require('./app/route/user.route.js');
user(app);
var order = require('./app/route/order.route.js');
order(app);
var order_product = require('./app/route/order_product.route.js');
order_product(app);
var product = require('./app/route/product.route.js');
product(app);
var product_category = require('./app/route/product_category.route.js');
product_category(app);
var auth = require('./app/route/auth.route.js');
auth(app);