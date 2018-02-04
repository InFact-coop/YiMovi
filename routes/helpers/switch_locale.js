const { localizeTernary, } = require('./localize_results');

// returns original URL flipped from english > chinese, or vice versa
module.exports = url => {
  return url.split('/').reduce((previous, current, index) => {
    return index === 1
      ? `/${localizeTernary(current, 'chn', 'en')}`
      : `${previous}/${current}`;
  });
};
