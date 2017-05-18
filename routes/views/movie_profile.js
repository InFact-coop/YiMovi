const keystone = require('keystone');
const Movie = keystone.list('Film');
const Director = keystone.list('Director');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.movie = {};

    Movie.model.findOne({ key: req.params.name, }).exec((err, movie) => {

      if (err) return next(err);

      locals.movie = movie;

      Director.model.findOne({ _id: movie.director, }).exec((DirectorErr, director) => {

        if (DirectorErr) return next(DirectorErr);

        locals.movie.director = director;

        next();

      });
    });
  });

  view.render('movie_profile');
};
