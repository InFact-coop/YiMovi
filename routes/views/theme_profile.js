const keystone = require('keystone');

const Theme = keystone.list('Theme');

const getMoviesBy = require('./../helpers/getMoviesBy.js');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.theme = {};
    locals.title = '';
    locals.movies = [];
    locals.color = 'purple';

    Theme.model.findOne({ key: req.params.name, }).exec((err, theme) => {

      if (err || !theme) {
        {
          res.locals.title = '404 error | YiMovi';
          res.status(404).render('errors/404');
          return;
        }
      }

      locals.theme = theme;
      locals.title = `Movies about ${theme.name} | YiMovi`;

      getMoviesBy('themes', theme, (moviesErr, movies) => {
        if (moviesErr) return next(moviesErr);
        locals.movies = locals.movies.concat(movies || []);
        next();
      });
    });
  });

  view.render('theme_profile');
};
