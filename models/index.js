const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');
const Promise = require('bluebird');

module.exports = (Sequelize, config) =>
{
    const sequelize = new Sequelize('database', 'username', '',
                                    {
                                        host: 'localhost',
                                        dialect: 'sqlite',
                                        storage: './lab.sqlite'
                                    });

    const turtles = Turtle(Sequelize, sequelize);
    const weapons = Weapon(Sequelize, sequelize);
    const pizzas = Pizza(Sequelize, sequelize);

    turtles.belongsTo(weapons, {foreignKey: 'weaponId', targetKey: 'id'});
    turtles.belongsTo(pizzas, {foreignKey: 'firstFavoritePizzaId', targetKey: 'id'});
    turtles.belongsTo(pizzas, {foreignKey: 'secondFavoritePizzaId', targetKey: 'id'});



    return {
        turtles,
        weapons,
        pizzas,

        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};