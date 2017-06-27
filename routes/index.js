const keystone = require('keystone');
const middleware = require('./middleware');
const i18n = require('i18n');
const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', i18n.init);
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', (_, res, next) => {
  res.locals.utils = require('keystone-utils');
  res.locals.site_url = process.env.SITE_URL || 'http://0.0.0.0:3000';
  next();
});
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

  const viewRouter = require('express').Router();

  viewRouter.use((req, res, next) => {
    // console.log(req);
    const url = req.res.req.originalUrl;
    const locale = url.split('/')[1];
    if ([ 'en', 'chn', ].includes(locale) != true) {
      return res.redirect('/en' + url);
    } else {
      // Add locale key to locals object
      res.locals.locale = locale;
      // Import matching JSON file as JS object and set to __ key
      res.locals.__ = require(`../locales/${locale}.json`);
      next();
    }
  });

  viewRouter.get('/', routes.views.index);
  viewRouter.get('/directors', routes.views.list_directors);
  viewRouter.get('/contact', routes.views.contact);
  viewRouter.get('/themes', routes.views.list_themes);
  viewRouter.get('/genres', routes.views.list_genres);
  viewRouter.get('/movies', routes.views.list_movies);
  viewRouter.get('/themes/:name', routes.views.theme_profile);
  viewRouter.get('/genres/:name', routes.views.genre_profile);
  viewRouter.get('/directors/:name', routes.views.director_profile);
  viewRouter.get('/movies/:name', routes.views.movie_profile);

  app.use('/:lang', viewRouter);

  app.use('/', (req, res) => {
    res.redirect('/en');
  });
};
