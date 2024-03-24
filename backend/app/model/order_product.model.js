module.exports = (sequelize, Sequelize) => {
    var OrderProduct = sequelize.define(
        'order_product', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            product_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            order_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
        });

    // Определяем связи таблицы user_category с другими таблицами
    OrderProduct.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        OrderProduct.belongsTo(models.order, {
            foreignKey: 'order_id'
        });

        // Определение связи один-ко-многим с таблицей category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы category): в файле category.model.js
        OrderProduct.belongsTo(models.product, {
            foreignKey: 'product_id'
        });


    };
    return OrderProduct;
};