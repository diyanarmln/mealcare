import { resolve } from 'path';
import db from './models/index.mjs';

import initRecipesController from './controllers/recipes.mjs';
import initPlansController from './controllers/plans.mjs';
import initUsersController from './controllers/users.mjs';

export default function routes(app) {
  const recipesController = initRecipesController(db);
  const plansController = initPlansController(db);
  const usersController = initUsersController(db);

  app.get('/api/recipes', recipesController.index);
  app.post('/api/recipes', recipesController.create);
  app.put('/api/recipe/:id/edit', recipesController.update);
  app.get('/api/recipe/:id', recipesController.show);
  app.delete('/api/recipe/:id', recipesController.remove);
  app.get('/api/plan/:plannerId', plansController.show);
  app.put('/api/plan/:plannerId', plansController.update);
  app.get('/api/user', usersController.dashboard);
  app.post('/api/login', usersController.login);
  app.delete('/api/logout', (_, res) => {
    res.clearCookie('userId');
    res.cookie('loggedIn', false);
    res.send({});
  });

  app.get('/*', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
