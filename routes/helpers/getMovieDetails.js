/* dependencies */
const async = require('async');
const keystone = require('keystone');

/* models */
const Director = keystone.list('Director');
const Theme = keystone.list('Theme');
const Genre = keystone.list('Genre');

module.exports = (movie, cb) => {

  const getDirector = (cb) =>
    Director.model.findOne({ _id: movie.director, }).exec(cb);

  const getThemes = (cb) =>
    Theme.model.find({ _id: { $in: movie.themes, }, }).exec(cb);

  const getGenres = (cb) =>
    Genre.model.find({ _id: { $in: movie.genre, }, }).exec(cb);

  async.parallel([ getDirector, getThemes, getGenres, ], (err, result) => {

    if (err) return cb(err);

    return cb(null, {
      director: result[0],
      themes: result[1],
      genres: result[2],
    });
  });
};
