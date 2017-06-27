const test = require('tape');
const { localize, localizeResults, } = require('../../routes/helpers/localize_results.js');

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
  t.deepEqual(localizeResults('en', testObj), testObj, 'same object returned when locale is EN');
  t.ok(localizeResults('fr', [ testObj, ]) instanceof Array, 'array returned if input is array');
  t.end();
});
