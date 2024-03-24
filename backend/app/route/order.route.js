module.exports = (app) => {

    const order = require('../controller/order.controller');
    // Добавление пользователя
    app.post('/api/addOrder', order.create);
    // Получение всех пользователей
    // Обновление данных пользователя по id
    app.post('/api/updateOrder/:id', order.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteOrder/:id', order.delete);

    // Получение пользователя по id
    app.get('/api/Order/:id', order.findById);
    
    app.get('/api/Orders', order.findAll);
};