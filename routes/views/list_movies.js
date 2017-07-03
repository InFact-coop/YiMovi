const keystone = require('keystone');
const Movie = keystone.list('Movie');


exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.title = res.__('list_movies.page_title');
    locals.movies = [];

    Movie.model.find()
      .sort('sortOrder')
      .populate('director')
      .exec((err, movies) => {

        if (err) return next(err);

        locals.movies = movies;
        next();
      });
  });

  view.render('list_movies');
};
