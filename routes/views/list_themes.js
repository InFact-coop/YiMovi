const keystone = require('keystone');
const Theme = keystone.list('Theme');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.themes = [];
    locals.title = 'Browse movies by theme | YiMovi';
    locals.color = 'purple';

    Theme.model.find().sort('sortOrder').exec((err, themes) => {

      if (err) return next(err);

      locals.themes = themes;
      next();
    });
  });

  view.render('list_themes');
};
