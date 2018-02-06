const keystone = require('keystone');
const Movie = keystone.list('Movie');
const { localizeTernary, } = require('./localize_results');

module.exports = (locale, field, { id, }, cb) => {
  const sortOrder = localizeTernary(locale, 'name', 'name_chn');
  Movie.model
    .find({ [field]: { _id: id, }, })
    .sort(sortOrder)
    .populate('director')
    .exec(cb);
};
