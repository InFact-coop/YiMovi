const keystone = require('keystone');
const Theme = keystone.list('Theme');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.theme = {};

    Theme.model.findOne({ key: req.params.name, }).exec((err, theme) => {

      if (err) return next(err);

      locals.theme = theme;
      next();
    });
  });

  view.render('theme_profile');
};
