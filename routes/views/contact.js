const keystone = require('keystone');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);
  view.on('init', next => {
    res.locals.hide_footer = true;
    next();
  });

  view.render('contact');
};
