const keystone = require('keystone');
const Director = keystone.list('Director');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.title = res.__('list_directors.page_title');
    locals.directors = [];

    Director.model.find()
      .select('-description -image -description___chn')
      .lean()
      .sort('sortOrder').exec((err, directors) => {

        if (err) return next(err);

        locals.directors = directors;

        next();
      });
  });

  view.render('list_directors');
};
