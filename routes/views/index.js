const keystone = require('keystone');
const Theme = keystone.list('Theme');
const AboutUs = keystone.list('About_us');

const { defaultLocale, } = require('../setup/locales.js');
const { localizeResults, } = require('../helpers/localize_results.js');

exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.themes = [];

    // Check redirect query after sending mail
    if (req.query.mailsent) {
      req.flash('success', res.locals.__.flash_messages.mail_sent);
    }

    Theme.model
      .find()
      // filter out untranslated results
      .where(
        'name' + (locals.locale === defaultLocale ? '' : `___${locals.locale}`)
      )
      .ne(null)
      .limit(8)
      .sort('sortOrder')
      .exec((err, themes) => {
        if (err) return next(err);

        locals.themes = localizeResults(locals.locale, themes);

        AboutUs.model.findOne().exec((err, aboutUs) => {
          if (err) return next(err);

          locals.about_us = localizeResults(locals.locale, aboutUs);

          next();
        });
      });
  });

  view.render('index');
};
