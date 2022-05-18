import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import initUserModel from './user.mjs';
import initRecipeModel from './recipe.mjs';
import initCategoryModel from './category.mjs';
import initIngredientModel from './ingredient.mjs';
import initPlanModel from './plan.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = initUserModel(sequelize, Sequelize.Datatypes);
db.Recipe = initRecipeModel(sequelize, Sequelize.Datatypes);
db.Category = initCategoryModel(sequelize, Sequelize.Datatypes);
db.Ingredient = initIngredientModel(sequelize, Sequelize.Datatypes);
db.Plan = initPlanModel(sequelize, Sequelize.Datatypes);

db.Recipe.belongsTo(db.User);
db.User.hasMany(db.Recipe);

db.Recipe.belongsToMany(db.Category, { through: 'category_recipes' });
db.Category.belongsToMany(db.Recipe, { through: 'category_recipes' });

db.Recipe.belongsToMany(db.Ingredient, { through: 'recipe_ingredients' });
db.Ingredient.belongsToMany(db.Recipe, { through: 'recipe_ingredients' });

// multiple foreign key columns referencing the same table

db.Recipe.hasMany(db.Plan, {
  as: 'breakfastMeal',
  foreignKey: 'breakfast_recipe',
});

db.Recipe.hasMany(db.Plan, {
  as: 'lunchMeal',
  foreignKey: 'lunch_recipe',
});

db.Recipe.hasMany(db.Plan, {
  as: 'dinnerMeal',
  foreignKey: 'dinner_recipe',
});

db.Plan.belongsTo(db.Recipe, {
  as: 'breakfast',
  foreignKey: 'breakfast_recipe',
});

db.Plan.belongsTo(db.Recipe, {
  as: 'lunch',
  foreignKey: 'lunch_recipe',
});

db.Plan.belongsTo(db.Recipe, {
  as: 'dinner',
  foreignKey: 'dinner_recipe',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
