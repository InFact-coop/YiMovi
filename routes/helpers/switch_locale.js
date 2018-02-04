const { localizeTernary, } = require('./localize_results');

// inputs a URL and returns a new URL flipped from:
// English ('/en/...') to Chinese ('/chn/...'), or vice versa

module.exports = url => {
  return url.split('/').reduce((previous, current, index) => {
    return index === 1
      ? `/${localizeTernary(current, 'chn', 'en')}`
      : `${previous}/${current}`;
  });
};
