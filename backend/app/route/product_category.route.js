module.exports = (app) => {

    const product_category = require('../controller/product_category.controller');
    // Добавление пользователя
    app.post('/api/addProductCategory', product_category.create);
    // Получение всех пользователей
    // Обновление данных пользователя по id
    app.post('/api/updateProductCategory/:id', product_category.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteProductCategory/:id', product_category.delete);

    // Получение пользователя по id
    app.get('/api/product_category/:id', product_category.findById);

    // Получение пользователя по username
    app.get('/api/product_category/name/:name', product_category.findByName);
    
    app.get('/api/product_categorys', product_category.findAll);
};