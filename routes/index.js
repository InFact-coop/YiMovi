const keystone = require('keystone');
const middleware = require('./middleware');
const switchLocale = require('./helpers/switch_locale');
const cookieParser = require('cookie-parser');
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
exports = module.exports = app => {
  // Use express's router as middleware
  // Base routes are accessible with /{locale}/ prepended
  const viewRouter = require('express').Router();

  viewRouter.use((req, res, next) => {
    // Extract locale (e.g.) 'en' or 'chn' from full url
    const locale = req.originalUrl.split('/')[1];

    // If /en/ or /chn/ not included in url
    if ([ 'en', 'chn', ].includes(locale) !== true) {
      // Use locale from cookie (if exists), then redirect
      // This ensures links throughout application do not need to
      // manually be prefixed with 'en' / 'chn'.
      // Defaults to redirect with 'en' if cookie not found
      return res.redirect(`/${res.locale || 'en'}${req.originalUrl}`);
    } else {
      // Add locale key to locals object
      res.locals.locale = locale;

      // Add locale to cookie
      res.cookie('locale', locale, {
        maxAge: 900000,
        httpOnly: process.env.NODE_ENV === 'production',
      });

      // Import matching JSON file as JS object and set to __ key
      res.locals.__ = require(`../locales/${locale}.json`);
      res.locals.languageSwitchUrl = switchLocale(req.originalUrl);
      next();
    }
  });

  // Standard routes
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

  // Use viewRouter as sub router aginst /en/ or /chn/ prepended paths
  app.use('/:lang', viewRouter);

  // Add cookie support
  app.use(cookieParser());

  // On page load, direct to /en
  app.use('/', (req, res) => {
    res.redirect(`/${res.locale || 'en'}`);
  });
};
