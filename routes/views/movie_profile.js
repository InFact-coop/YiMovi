const keystone = require('keystone');
const Movie = keystone.list('Movie');

const getMovieDetails = require('./../helpers/getMovieDetails.js');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.movie = {};
    locals.director = {};
    locals.genre = [];
    locals.themes = [];

    Movie.model.findOne({ key: req.params.name, }).exec((err, movie) => {

      if (err) return next(err);

      locals.movie = movie;

      getMovieDetails(movie, (detailsErr, details) => {

        if (detailsErr) return next(detailsErr);
        locals.director = details.director;
        locals.themes = details.themes;
        locals.genres = details.genres;
        next();
      });
    });
  });

  view.render('movie_profile');
};
