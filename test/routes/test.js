const test = require('tape');
const { localize, localizeResults, } = require('../../routes/helpers/localize_results.js');

const { defaultLocale, } = require('../../routes/setup/locales.js');

test('test localize function', (t) => {
  t.deepEqual(localize('fr', {}), {}, 'returns an empty object if results object is empty');
  t.deepEqual(
    localize('es', { thing___es: 'thing', other: 'other thing', }),
    { thing: 'thing', other: 'other thing', },
    'locale removed from localised string'
  );
  t.end();
});

test('test localizeresults function', (t) => {
  const testObj = { key: 'value', name___en: 'nameEn', };
  t.deepEqual(localizeResults(defaultLocale, testObj), testObj, 'same object returned when locale is EN');
  t.ok(localizeResults('fr', [ testObj, ]) instanceof Array, 'array returned if input is array');

  const testObj2 = { key: 'value', name: 'name', name___de: 'nameDe', name___fr: 'nameFr', other___de: 'otherDe', };
  t.deepEqual(localizeResults('fr', testObj2), { key: 'value', name: 'nameFr', }, 'irrelevant fields discarded');
  t.end();
});
