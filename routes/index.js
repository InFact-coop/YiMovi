const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', (req, res) => {
  res.locals.title = '404 error | YiMovi';
  res.status(404).render('errors/404');
});

// Handle other errors
keystone.set('500', (err, req, res) => {
  let title, message;
  if (err instanceof Error) {
    message = err.message;
    err = err.stack;
  }
  res.err(err, title, message);
});

// Load Routes
const routes = {
  views: importRoutes('./views'),
};

// Bind Routes
exports = module.exports = (app) => {
  app.get('/', routes.views.index);
  app.get('/directors', routes.views.list_directors);
  app.get('/themes', routes.views.list_themes);
  app.get('/genres', routes.views.list_genres);
  app.get('/movies', routes.views.list_movies);
  app.get('/themes/:name', routes.views.theme_profile);
  app.get('/genres/:name', routes.views.genre_profile);
  app.get('/directors/:name', routes.views.director_profile);
  app.get('/movies/:name', routes.views.movie_profile);
};
