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
  res.locals.host = process.env.HOST || 'http://0.0.0.0:3000';
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
    console.log(req.res.req.originalUrl);
    
    const url = req.res.req.originalUrl;
    const locale = url.split('/')[1];
    if ([ 'en', 'chn', ].includes(locale) != true) {
      return res.redirect('/en' + url);
    } else {
      i18n.setLocale(res, locale);
      next();
    }
  });

  viewRouter.get('/', routes.views.index);
  viewRouter.get('/directors', routes.views.list_directors);
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


  // app.use((req, res, next) => {
  //   const url = req.res.req.originalUrl;
  //   const locale = url.split('/')[1];
  //   const availableLocales = [ 'en', 'chn', ];
  //   if (availableLocales.indexOf(locale) < 0) {
  //     return res.redirect('/en' + url);
  //   }
  //   i18n.setLocale(res, locale);
  //   next();
  // });
  //
  //
  // app.get('/', routes.views.index);
  // app.get('/directors', routes.views.list_directors);
  // app.get('/themes', routes.views.list_themes);
  // app.get('/genres', routes.views.list_genres);
  // app.get('/movies', routes.views.list_movies);
  // app.get('/themes/:name', routes.views.theme_profile);
  // app.get('/genres/:name', routes.views.genre_profile);
  // app.get('/directors/:name', routes.views.director_profile);
  // app.get('/movies/:name', routes.views.movie_profile);
  // app.get('/contact', routes.views.contact);
};
