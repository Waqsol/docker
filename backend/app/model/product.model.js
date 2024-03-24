module.exports = (sequelize, Sequelize) => {
    var Product = sequelize.define(
        'product', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            category_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            price: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            bonus_price: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            discription: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            link: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
        });

    // Определяем связи таблицы user_category с другими таблицами
    Product.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        Product.belongsTo(models.product_category, {
            foreignKey: 'category_id'
        });

        // Определение связи один-ко-многим с таблицей spending. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы spending): в файле spending.model.js
        Product.hasMany(models.order_product, {
            foreignKey: 'product_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Product;
};