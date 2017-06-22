const keystone = require('keystone');
const Director = keystone.list('Director');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.directors = [];
    locals.title = 'Browse by director | YiMovi';
    locals.color = 'green';

    Director.model.find().exec((err, directors) => {

      if (err) return next(err);

      locals.directors = directors;
      next();
    });
  });

  view.render('list_directors');
};
