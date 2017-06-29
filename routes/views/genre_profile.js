const keystone = require('keystone');
const Genre = keystone.list('Genre');
const getMoviesBy = require('./../helpers/getMoviesBy.js');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.genre = {};
    locals.movies = [];

    Genre.model.findOne({ key: req.params.name, })
      .exec((err, genre) => {

        if (err || !genre) {
          res.status(404).render('errors/404');
          return;
        }

        locals.genre = require('../helpers/localize_results.js')
        .localizeResults(locals.locale, genre);


        getMoviesBy('genre', genre, (moviesErr, movies) => {
          if (moviesErr) return next(moviesErr);
          locals.movies = locals.movies.concat(movies || []);
          next();
        });

      });
  });

  view.render('genre_profile');
};
