const keystone = require('keystone');
const Director = keystone.list('Director');
const getMoviesBy = require('./../helpers/getMoviesBy.js');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.title = '';
    locals.director = {};
    locals.movies = [];

    Director.model.findOne({ key: req.params.name, }).exec((err, director) => {

      if (err || !director) {
        res.locals.title = '404 error | YiMovi';
        res.status(404).render('errors/404');
        return;
      }

      locals.director = director;

      getMoviesBy('director', director, (moviesErr, movies) => {
        if (moviesErr) return next(moviesErr);
        locals.movies = locals.movies.concat(movies || []);
        next();
      });
    });
  });

  view.render('director_profile');
};
