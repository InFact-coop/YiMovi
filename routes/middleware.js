const _ = require('underscore');
const viewColors = require('./setup/view-colors.js');

/**
    Initialises the standard view locals.
    Include anything that should be initialised before route controllers are executed.
*/
exports.initLocals = (req, res, next) => {

  const locals = res.locals;
  locals.user = req.user;

  // Extract view key...
  // Which is either 'themes', 'directors', 'genres', 'movies', 'default'
  // Set primary color based on view
  const view = req.url.split('/')[2];
  locals.primaryColor = (viewColors[view] || viewColors.default);
  // Prepend 'light-' to primaryColor to build secondary
  locals.secondaryColor = `light-${locals.primaryColor}`;
  // Assert that views have access to full url
  // (not including host/port)
  locals._url = req.originalUrl;
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
