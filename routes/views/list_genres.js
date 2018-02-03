const keystone = require('keystone');
const Genre = keystone.list('Genre');
const { localizeResults, } = require('../helpers/localize_results.js');

exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.title = res.__('list_genres.page_title');
    locals.genres = [];

    const nameField =
      'name' + (locals.locale === 'en' ? '' : `___${locals.locale}`);

    Genre.model
      .find()
      .select('-description -description___chn')
      .where(nameField)
      .ne(null) // only if translation of genre name available
      .sort('sortOrder')
      .lean()
      .exec((err, genres) => {
        if (err) return next(err);

        locals.genres = localizeResults(locals.locale, genres);

        next();
      });
  });

  view.render('list_genres');
};
