const keystone = require('keystone');
const Genre = keystone.list('Genre');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.genres = [];

    Genre.model.find().sort('sortOrder').exec((err, genres) => {

      if (err) return next(err);

      locals.genres = genres;
      next();
    });
  });

  view.render('list_genres');
};
