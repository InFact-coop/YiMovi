const keystone = require('keystone');
const Theme = keystone.list('Theme');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.themes = [];

    // Check redirect query after sending mail
    if (req.query.mailsent) {
      req.flash('success', res.locals.__.app.flash_messages.mail_sent);
    }

    Theme.model.find()
      .where('name___chn').ne(null)
      .limit(8).sort('sortOrder').exec((err, themes) => {

        if (err) return next(err);

        locals.themes = require('../helpers/localize_results.js')
        .localizeResults(locals.locale, themes);

        next();
      });
  });

  view.render('index');
};
