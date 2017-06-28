const fs = require('fs');
const _ = require('underscore');
const { locales, } = require('../routes/setup/locales.js');

const pathToJson = locale => `./locales/${locale}.json`;

const getFileData = locale =>
  JSON.parse(fs.readFileSync(pathToJson(locale)));
const flattenArrKeys = arr => _.flatten(_.keys(arr)
  .map(key => _.keys(arr[key])
    .map(innerKey => `${key}.${innerKey}`)
));

const flattenAndUniq = data =>
  _.uniq(data
    .map(flattenArrKeys)
    .reduce((a, b) => a.concat(b))
  );

// takes array of parsed JSON objects from all locale.json files
const fileDataToArray = fileData => {

  // get unique translation keys from all files
  const keys = flattenAndUniq(fileData);

  const translations = fileData
    .map(dataObj => keys.map(key => {
      const [ section, translationKey, ] = key.split('.');
      if (!dataObj[section]) return '';
      return dataObj[section][translationKey] || '';})
    );

  return _.zip.apply(null, [ keys, ].concat(translations));

};

const arrayToCsvString = data => {
  const rows = data.map(row => row.map(col => `"${col}"`).join(','));
  return rows.join('\n');
};

const createCsvFile = string => {
  fs.writeFile(`./translation_csv/translations_${_.now()}.csv`, string, (err) => {
    if (err) return console.log(err);
    console.log('success - new file created');
  });
};

const jsonFileData = locales.map(getFileData);
const array = fileDataToArray(jsonFileData);
const csvString = arrayToCsvString(array);

if (!fs.existsSync('./translation_csv')){
  fs.mkdirSync('./translation_csv');
}

createCsvFile(csvString);
