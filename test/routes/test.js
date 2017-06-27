const test = require('tape');
const { localize, localizeResults, } = require('../../routes/helpers/localize_results.js');

test('test localize results function', (t) => {
  t.deepEqual(localize('fr', {}), {}, 'ok');
  t.end();
});
