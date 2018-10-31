    module.exports = (Sequelize, sequelize) => {
    return sequelize.define('weapons', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(50)},
        dps: {type: Sequelize.DOUBLE}
    });
};