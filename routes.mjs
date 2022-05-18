import { resolve } from 'path';
import db from './models/index.mjs';

import initRecipesController from './controllers/recipes.mjs';

export default function routes(app) {
  const recipesController = initRecipesController(db);

  app.get('/api/recipes', recipesController.index);
  app.post('/api/recipes', recipesController.create);
  app.put('/api/recipe/:id/edit', recipesController.update);
  app.get('/api/recipe/:id', recipesController.show);
  app.delete('/api/recipe/:id', recipesController.remove);

  app.get('/*', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
