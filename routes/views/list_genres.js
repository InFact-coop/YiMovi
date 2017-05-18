const keystone = require('keystone');
const Genre = keystone.list('Genre');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.genres = [];
    locals.title = 'Browse by genre | YiMovi';

    Genre.model.find().exec((err, genres) => {

      if (err) return next(err);

      locals.genres = genres;
      next();
    });
  });

  view.render('list_genres');
};
