const { defaultLocale, } = require('../setup/locales.js');

const localize = (locale, dbResultsObj, convertToJson) => {
  // keynames in DB that contain translatable content follow pattern 'name___locale'
  const separator = '___';
  const translatableKeyReg = /\_{3}.+$/;

  // create new results object with relevant data only
  return Object.keys(convertToJson ? dbResultsObj.toJSON() : dbResultsObj)
    .filter(key => {
      const loc = key.split(separator)[1];
      return !loc || loc === locale;
    }) // change key name so that '___LOCALE' part is discarded
    .reduce(
      (a, b) =>
        Object.assign({}, a, {
          [b.replace(translatableKeyReg, '')]: dbResultsObj[b],
        }),
      {}
    );
};

const localizeResults = (locale, dbResults, convertToJson) => {
  // if currentLocale === defaultLocale, do nothing
  // english is default
  if (locale === defaultLocale) return dbResults;

  if (dbResults instanceof Array) {
    return dbResults.map(dbResult => localize(locale, dbResult, convertToJson));
  }

  // if not array, check for _doc object
  return localize(locale, dbResults._doc || dbResults);
};

const localizeTernary = (locale, enString, chnString) => {
  return locale === 'en' ? enString : chnString;
};

module.exports = { localize, localizeResults, localizeTernary, };
