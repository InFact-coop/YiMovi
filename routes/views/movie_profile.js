const keystone = require('keystone');
const Movie = keystone.list('Movie');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {

    const locals = res.locals;

    locals.movie = {};
    locals.director = {};
    locals.genres = [];
    locals.themes = [];
    locals.utils = require('keystone-utils');

    Movie.model.findOne({ key: req.params.name, })
      .populate('director')
      .populate('themes')
      .populate('genre')
      .exec((err, movie) => {

        if (err || !movie) {
          res.locals.title = '404 error | YiMovi';
          res.status(404).render('errors/404');
          return;
        }

        locals.movie = movie;
        locals.director = movie.director;
        locals.themes = movie.themes;
        locals.genres = movie.genre;

        locals.title = `${movie.name} ${movie.name_chn || ''} | YiMovi movie profile`;

        next();
      });
  });

  view.render('movie_profile');
};
