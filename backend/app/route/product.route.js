module.exports = (app) => {

    const product = require('../controller/product.controller');
    // Добавление пользователя
    app.post('/api/addProduct', product.create);
    // Получение всех пользователей
    // Обновление данных пользователя по id
    app.post('/api/updateProduct/:id', product.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteProduct/:id', product.delete);

    // Получение пользователя по id
    app.get('/api/Product/:id', product.findById);

    // Получение пользователя по username
    app.get('/api/Product/name/:name', product.findByName);
    
    app.get('/api/Products', product.findAll);

    app.get('/api/Product/category_id/:category_id', product.findByCategory);

};