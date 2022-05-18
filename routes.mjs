import { resolve } from 'path';
import db from './models/index.mjs';

import initRecipesController from './controllers/recipes.mjs';

export default function routes(app) {
  const recipesController = initRecipesController(db);

  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  app.get('/api/recipes', recipesController.index);
  app.get('/api/recipe/:id', recipesController.show);
  app.post('api/recipe/:id', recipesController.create);
  app.put('/api/recipe/:id/edit', recipesController.edit);
  app.delete('/api/recipe/:id', recipesController.destroy);
}
