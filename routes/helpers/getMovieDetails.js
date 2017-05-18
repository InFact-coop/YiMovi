/* dependencies */
const async = require('async');
const keystone = require('keystone');

/* models */
const Director = keystone.list('Director');
const Theme = keystone.list('Theme');
const Genre = keystone.list('Genre');

let movieDetails;

const getDirector = (cb) => {

  Director.model.findOne({ _id: movieDetails.director, }).exec((err, director) => {
    if (err) return cb(err);
    return cb(null, director);
  });
};

const getThemes = (cb) => {

  Theme.model.find({ _id: { $in: [ movieDetails.themes, ], }, }).exec((err, themes) => {
    if (err) return cb(err);
    return cb(null, themes);
  });
};

const getGenres = (cb) => {

  Genre.model.find({ _id: { $in: [ movieDetails.genre, ], }, }).exec((err, genres) => {
    if (err) return cb(err);
    return cb(null, genres);
  });
};

module.exports = (movie, cb) => {

  movieDetails = movie;

  async.parallel([ getDirector, getThemes, getGenres, ], (err, result) => {

    if (err) cb(err);
    return cb(null, {
      director: result[0],
      themes: result[1],
      genres: result[2],
    });
  });
};
