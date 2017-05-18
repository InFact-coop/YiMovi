const keystone = require('keystone');
const Movie = keystone.list('Movie');

module.exports = (field, { id, }, callback) => {

  Movie.model.find({ [field]: { _id: id, }, }).exec((err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
