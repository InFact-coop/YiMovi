const keystone = require('keystone');
const Theme = keystone.list('Theme');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.themes = [];

    Theme.model.find().limit(8).sort('sortOrder').exec((err, themes) => {

      if (err) return next(err);

      locals.themes = themes;
      next();
    });
  });

  view.render('index');
};
