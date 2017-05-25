const keystone = require('keystone');
const Movie = keystone.list('Movie');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.movies = [];
    locals.title = 'Browse by title | YiMovi';

    Movie.model.find().populate('director').exec((err, movies) => {

      if (err) return next(err);

      locals.movies = movies;
      next();
    });
  });

  view.render('list_movies');
};
