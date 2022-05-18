export default function initRecipesController(db) {
  const index = async (request, response) => {
    try {
      const recipes = await db.Recipe.findAll({
        where: {
          userId: 1,
        },
      });
      const recipeArr = recipes.map((el) => ({
        id: el.id,
        title: el.title,
        servings: el.servings,
      }));
      response.send(recipeArr);
    } catch (err) {
      response.status(500).send(err);
    }
  };

  const show = async (request, response) => {
    await db.Recipe.findOne({
      where: {
        id: request.params.id,
      },
    })
      .then((recipe) => {
        response.send(recipe);
      })
      .catch((error) => console.log(error));
  };

  const create = async (request, response) => {
    try {
      const newRecipe = {
        userId: 1,
        title: request.body.title,
        recipeInstructions: request.body.instructions,
        servings: request.body.servings,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // run the DB INSERT query
      await db.Recipe.create(newRecipe);

      // create entry in join table
      // await recipe.addUser(user);

      response.send(
        { success: true },
      );
    } catch (error) {
      response.status(500).send(error);
    }
  };

  const update = async (request, response) => {
    const { id } = request.params;
    const recipe = await db.Recipe.findOne({ where: { id } });

    const updatedRecipe = {
      title: request.body.title,
      recipeInstructions: request.body.instructions,
      servings: request.body.servings,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      // run the DB INSERT query
      await recipe.update(updatedRecipe);

      // create entry in join table
      // await recipe.addUser(user);

      response.send(
        { success: true },
      );
    } catch (error) {
      response.status(500).send(error);
    }
  };

  const remove = async (request, response) => {
    try {
      const { id } = request.params;
      const recipe = await db.Recipe.findOne({ where: { id } });
      // TODO: error dealing
      recipe.destroy();
      response.send({ success: true });
    } catch (err) {
      response.status(500).send(err);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index,
    show,
    create,
    update,
    remove,
  };
}
