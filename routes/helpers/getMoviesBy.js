const keystone = require('keystone');
const Movie = keystone.list('Movie');

module.exports = (field, { id, }, cb) => {

  Movie.model.find({ [field]: { _id: id, }, }).exec(cb);

};
