const keystone = require('keystone');
const Movie = keystone.list('Film');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.movie = {};

    Movie.model.findOne({ key: req.params.name, }).exec((err, movie) => {

      if (err) return next(err);

      locals.movie = movie;
      next();
    });
  });

  view.render('movie_profile');
};
