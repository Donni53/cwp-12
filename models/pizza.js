module.exports = (Sequelize, sequelize) => {
    return sequelize.define('pizzas', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(50)},
        description: {type: Sequelize.STRING(50)},
        calories: {type: Sequelize.DOUBLE}
    });
};