const keystone = require('keystone');
const Team = keystone.list('Team');

exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.title = res.__('list_team.page_title');
    locals.team = [];
    Team.model
      .find()
      .lean()
      .sort('name')
      .exec((err, team) => {
        if (err) return next(err);

        locals.team = team;
        next();
      });
  });

  view.render('list_team');
};
