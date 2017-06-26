const keystone = require('keystone');
const Director = keystone.list('Director');
const getMoviesBy = require('./../helpers/getMoviesBy.js');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  view.on('init', next => {
    const locals = res.locals;
    locals.title = '';
    locals.director = {};
    locals.movies = [];

    Director.model.findOne({ key: req.params.name, }).exec((err, director) => {

      if (err) return next(err);

      // find out which fields in this model are translatable fields
      // don't want to hardcode this, as I would like to export this function and use it across all routes
      // also translatable key names have pattern name___LOCALE << yes, 3 underscores!!
      const translatableFields = Object.keys(director._doc)
        .filter(key => key.includes('___'))
        .map(filteredKey => filteredKey.split('___')[0]);


      // get only relevant fields
      const directorLocalized = locals.locale === 'en'
        ? director._doc
        : Object.keys(director._doc)
          .filter(key => {
            const [ type, locale, ] = key.split('___');
            console.log({ type, locale, });
            return translatableFields.indexOf(type) < 0 || locale === locals.locale;
          })
          // change key name so that '___LOCALE' part is discarded
          .reduce((a, b) =>
            Object.assign({}, a, { [b.replace(/\_\_.+$/, '')] : director[b], }), {});

      // pass only relevant (localized) data down to route
      locals.director = directorLocalized;
      locals.title = `${director.name} ${director.name_chn || ''} | YiMovi director profile`;

      console.log({ directorLocalized, });

      getMoviesBy('director', director, (moviesErr, movies) => {
        if (moviesErr) return next(moviesErr);
        locals.movies = locals.movies.concat(movies || []);
        next();
      });
    });
  });

  view.render('director_profile');
};
