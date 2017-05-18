const keystone = require('keystone');
const Director = keystone.list('Director');
const Movie = keystone.list('Film');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.director = {};

    Director.model.findOne({ key: req.params.name, }).exec((err, director) => {

      if (err) return next(err);

      locals.director = director;

      Movie.model.find({ director: { _id: director.id, }, }).exec((movieErr, movies) => {

        if (movieErr) return next(movieErr);

        locals.director.movies = movies;

        next();

      });
    });
  });
  
  view.render('director_profile');
};
