const { defaultLocale, } = require('../setup/locales.js');

const localize =  (locale, dbResultsObj) => {

  // keynames in DB that contain translatable content follow pattern 'name___locale'
  const separator = '___';
  const translatableKeyReg = /\_{3}.+$/;

  // create new results object with relevant data only
  return Object.keys(dbResultsObj)
    .filter(key => {
      const loc = key.split(separator)[1];
      return !loc || loc === locale;
    }) // change key name so that '___LOCALE' part is discarded
    .reduce((a, b) =>
      Object.assign({}, a, { [b.replace(translatableKeyReg, '')] : dbResultsObj[b], }), {});
};

const localizeResults = (locale, dbResults) => {

  // if currentLocale === defaultLocale, do nothing
  // english is default
  if (locale === defaultLocale) return dbResults;

  if (dbResults instanceof Array) {
    return dbResults.map(dbResult => localize(locale, dbResult));
  }

  // if not array, check for _doc object
  return localize(locale, dbResults._doc || dbResults);

};

module.exports = { localize, localizeResults, };
