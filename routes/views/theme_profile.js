const keystone = require('keystone');

const Theme = keystone.list('Theme');

const getMoviesBy = require('./../helpers/getMoviesBy.js');
const { localizeResults, } = require('../helpers/localize_results.js');


exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.theme = {};
    locals.movies = [];

    Theme.model.findOne({ key: req.params.name, }).exec((err, theme) => {

      if (err || !theme) {
        res.status(404).render('errors/404');
        return;
      }

      locals.theme = localizeResults(locals.locale, theme);

      locals.title = res.__('theme_profile.page_title', locals.theme.name);

      getMoviesBy('themes', theme, (moviesErr, movies) => {

        if (moviesErr) return next(moviesErr);

        locals.movies = locals.movies.concat(movies || []);

        next();
      });
    });
  });

  view.render('theme_profile');
};
