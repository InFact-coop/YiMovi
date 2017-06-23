const keystone = require('keystone');
const Theme = keystone.list('Theme');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.themes = [];

    // Check redirect query after sending mail
    if (req.query.mailsent) {
      req.flash('success', "Thank you for contacting us. We'll be in touch soon");
    }

    Theme.model.find().limit(8).sort('sortOrder').exec((err, themes) => {

      if (err) return next(err);

      locals.themes = themes;
      next();
    });
  });

  view.render('index');
};
