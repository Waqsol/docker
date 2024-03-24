module.exports = (app) => {

    const order_product = require('../controller/order_product.controller');
    // Добавление пользователя
    app.post('/api/addOrderProduct', order_product.create);
    // Получение всех пользователей
    // Обновление данных пользователя по id
    app.post('/api/updateOrderProduct/:id', order_product.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteOrderProduct/:id', order_product.delete);

    // Получение пользователя по id
    app.get('/api/OrderProduct/:id', order_product.findById);
    
    app.get('/api/OrderProducts', order_product.findAll);
};