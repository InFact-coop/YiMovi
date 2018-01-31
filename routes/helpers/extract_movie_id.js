const extract = movieUrl => {
  return movieUrl.split('/')[4];
};

module.exports = extract;
