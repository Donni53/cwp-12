module.exports = (Sequelize, sequelize) =>
{
    return sequelize.define('turtles', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: Sequelize.STRING(50),
        color: Sequelize.STRING(50),
        firstFavoritePizzaId:
            {
                type: Sequelize.INTEGER,
            }
    });
};