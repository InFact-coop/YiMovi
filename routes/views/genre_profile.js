const keystone = require('keystone');
const Genre = keystone.list('Genre');
const Movie = keystone.list('Film');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.genre = {};

    Genre.model.findOne({ key: req.params.name, }).exec((err, genre) => {

      if (err) return next(err);

      locals.genre = genre;

      Movie.model.find({ genre: { _id: genre.id, }, }).exec((movieErr, movies) => {

        if (movieErr) return next(movieErr);

        locals.genre.movies = movies;

        next();

      });
    });
  });

  view.render('genre_profile');
};
