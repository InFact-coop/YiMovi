const keystone = require('keystone');
const Genre = keystone.list('Genre');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.genre = {};

    Genre.model.findOne({ key: req.params.name, }).exec((err, genre) => {

      if (err) return next(err);

      locals.genre = genre;
      next();
    });
  });

  view.render('genre_profile');
};
