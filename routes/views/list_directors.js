const keystone = require('keystone');
const Director = keystone.list('Director');
const { localizeTernary, } = require('../helpers/localize_results');

exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.title = res.__('list_directors.page_title');
    locals.directors = [];
    locals.sortOrder = localizeTernary(locals.locale, 'name', 'name_chn');
    Director.model
      .find()
      .select('-description -image -description___chn')
      .lean()
      .sort(locals.sortOrder)
      .exec((err, directors) => {
        if (err) return next(err);

        locals.directors = directors;
        console.log('locals.directors', locals.directors);

        next();
      });
  });

  view.render('list_directors');
};
