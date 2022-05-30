export default function initRecipeModel(sequelize, DataTypes) {
  return sequelize.define('recipe', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
    },
    recipeIngredients: {
      type: DataTypes.TEXT,
    },
    recipeInstructions: {
      type: DataTypes.TEXT,
    },
    servings: {
      type: DataTypes.INTEGER,
    },
    filename: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },

  }, {
    // The underscored option makes Sequelize reference snake_case names in the DB.
    underscored: true,
  });
}
