module.exports = (locale, dbResults) => {

  // if currentLocale === defaultLocale, do nothing
  // english is default
  if (locale === 'en') return dbResults;

  // keynames in DB that contain translatable content follow pattern 'name___locale'
  const separator = '___';
  const translatableKeyReg = /\_{3}.+$/;

  // gets array of translatable values from DB results
  const translatableFields = Object.keys(dbResults)
    .filter(key => translatableKeyReg.test(key))
    .map(filteredKey => filteredKey.replace(translatableKeyReg, ''));

  // create new results object with relevant data only
  return Object.keys(dbResults)
    .filter(key => {
      const [ type, loc, ] = key.split(separator);
      return translatableFields.indexOf(type) < 0 || loc === locale;
    }) // change key name so that '___LOCALE' part is discarded
    .reduce((a, b) =>
      Object.assign({}, a, { [b.replace(translatableKeyReg, '')] : dbResults[b], }), {});
};
