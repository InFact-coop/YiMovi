const keystone = require('keystone');
const Theme = keystone.list('Theme');
const Movie = keystone.list('Movie');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.theme = {};
    locals.title = '';

    Theme.model.findOne({ key: req.params.name, }).exec((err, theme) => {

      if (err) return next(err);

      locals.theme = theme;

      Movie.model.find(({ themes: { _id: theme.id, }, })).exec((movieErr, movies) => {

        if (movieErr) return next(movieErr);

        locals.theme.movies = movies;
        locals.title = `Films about ${theme.name} | YiMovi`;

        next();

      });
    });
  });

  view.render('theme_profile');
};
