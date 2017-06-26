const _ = require('underscore');

/**
    Initialises the standard view locals.
    Include anything that should be initialised before route controllers are executed.
*/
exports.initLocals = (req, res, next) => {

  const locals = res.locals;
  locals.user = req.user;
  const viewColors = require('./setup/view-colors.js');
  const view = req.url.split('/')[2];
  locals.primaryColor = (viewColors[view] || viewColors.default);

  // Add your own local variables here
  next();
};

/**
  Converts (correct) locale JSON object to regular js object
  then assigned to __ key of locals object
*/
exports.initStatic = (req, res, next) => {
  res.locals.__ = require(`../locales/${res.locale}.json`);
  next();
};

/**
    Inits the error handler functions into `res`
*/
exports.initErrorHandlers = (req, res, next) => {

  // figure out what to do here!

  next();
};

/**
    Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = (req, res, next) => {

  const flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error'),
  };

  res.locals.messages = _.any(flashMessages, (msgs) => msgs.length)
    ? flashMessages
    : false;

  next();

};
