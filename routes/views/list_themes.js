const keystone = require('keystone');
const Theme = keystone.list('Theme');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.themes = [];

    const nameField = 'name' + (locals.locale === 'en' ? '' : `___${locals.locale}`);

    Theme.model.find()
      .select('-description -description___chn')
      .where(nameField).ne(null) // only if translation of theme name available
      .sort('sortOrder')
      .lean()
      .exec((err, themes) => {

        if (err) return next(err);

        locals.themes = require('../helpers/localize_results.js')
          .localizeResults(locals.locale, themes);

        next();
      });
  });

  view.render('list_themes');
};
