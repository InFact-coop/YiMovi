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
    locals.color = 'green';

    Director.model.findOne({ key: req.params.name, }).exec((err, director) => {

      if (err) return next(err);

      locals.director = director;
      locals.title = `${director.name} ${director.name_chn || ''} | YiMovi director profile`;

      getMoviesBy('director', director, (moviesErr, movies) => {
        if (moviesErr) return next(moviesErr);
        locals.movies = locals.movies.concat(movies || []);
        next();
      });
    });
  });

  view.render('director_profile');
};
