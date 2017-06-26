const keystone = require('keystone');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);
  view.on('init', next => {

    const locals = res.locals;

    locals.hide_footer = true;
    locals.email = process.env.EMAIL || 'none@none.com';

    next();
  });

  view.render('contact');
};
