module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      day_of_week: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      breakfast_recipe: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipes',
          key: 'id',
        },
      },
      lunch_recipe: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipes',
          key: 'id',
        },
      },
      dinner_recipe: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipes',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('plans');
  },
};
