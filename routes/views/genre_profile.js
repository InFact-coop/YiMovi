const keystone = require('keystone');
const Genre = keystone.list('Genre');
const getMoviesBy = require('./../helpers/getMoviesBy.js');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.genre = {};
    locals.movies = [];
    locals.title = '';

    Genre.model.findOne({ key: req.params.name, }).exec((err, genre) => {

      if (err) return next(err);

      locals.genre = require('../helpers/localize_results.js')
        .localizeResults(locals.locale, genre);

      locals.title = `${genre.name} films | YiMovi`;

      getMoviesBy('genre', genre, (moviesErr, movies) => {
        if (moviesErr) return next(moviesErr);
        locals.movies = locals.movies.concat(movies || []);
        next();
      });

    });
  });

  view.render('genre_profile');
};
