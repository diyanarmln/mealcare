export default function initRecipesController(db) {
  const index = (request, response) => {
    db.Recipe.findAll()
      .then((recipes) => {
        response.send(recipes);
      })
      .catch((error) => console.log(error));
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index,
  };
}
