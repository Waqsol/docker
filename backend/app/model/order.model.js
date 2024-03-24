module.exports = (sequelize, Sequelize) => {
    var Order = sequelize.define(
        'order', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true, 
                primaryKey: true, 
                allowNull: false
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            }
        });

    // Определяем связи таблицы category с другими таблицами
    Order.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        Order.hasMany(models.order_product, {
            foreignKey: 'order_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Order;
};