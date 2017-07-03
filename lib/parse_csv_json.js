const fs = require('fs');
const _ = require('underscore');
const path = require('path');
const jsonFormat = require('json-format');
const { locales, } = require('../routes/setup/locales.js');

const pathToCsv = path.join('translation_csv', process.argv[2]);

const fileInput = fs.readFileSync(pathToCsv).toString();

const getCsvRows = str => str.split(/\n/g);

const getCsvCols = str => str.slice(1).replace(/"$/, '').split(/","/g);

const csvStringToArray = str => getCsvRows(str).map(getCsvCols);

const getRowKey = row => row[0];

const getKeyHeading = row => getRowKey(row).split('.')[0];

const getKeyName = row => getRowKey(row).split('.')[1];

const makePair = (row, localeIndex) => _.object([ [ getKeyName(row), getLocaleStr(row, localeIndex), ], ]);

const transformGroup = (group, localeIndex) => group.map(row => makePair(row, localeIndex)).reduce((a,b) => Object.assign({}, a, b), {});

const getLocaleStr = (row, localeIndex) => row[localeIndex];

const getLocaleTranslations = (data, localeIndex) => {

  const rowsAndCols = csvStringToArray(fileInput);

  const headings = _.uniq(rowsAndCols.map(getKeyHeading));

  const keysGrouped = headings.map(heading => rowsAndCols.filter(row => getKeyHeading(row) === heading));

  return _.object(_.zip(headings, keysGrouped.map(group => transformGroup(group, localeIndex))));

};

locales.forEach((localeName, localeIndex) => {

  const localeTranslations = getLocaleTranslations(fileInput, localeIndex + 1);
  fs.writeFileSync(path.join(__dirname, '../locales', `${localeName}.json`), jsonFormat(localeTranslations));

});
