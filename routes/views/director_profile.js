const keystone = require('keystone');
const Director = keystone.list('Director');
const getMoviesBy = require('./../helpers/getMoviesBy.js');
const { localizeResults, } = require('../helpers/localize_results.js');

exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;

    locals.director = {};
    locals.movies = [];

    Director.model.findOne({ key: req.params.name, }).exec((err, director) => {
      if (err || !director) {
        res.status(404).render('errors/404');
        return;
      }

      locals.director = localizeResults(locals.locale, director);

      locals.title = res.__(
        'director_profile.page_title',
        locals.director.name,
        locals.director.name_chn
      );

      getMoviesBy(locals.locale, 'director', director, (moviesErr, movies) => {
        if (moviesErr) return next(moviesErr);
        locals.movies = locals.movies.concat(movies || []);
        next();
      });
    });
  });

  view.render('director_profile');
};
