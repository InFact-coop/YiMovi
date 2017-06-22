module.exports = {
  input: 'css/index.css',
  output: 'public/tachyons.min.css',
  use: [
    'postcss-import',
    'autoprefixer',
    'postcss-custom-media',
    'postcss-clean',
    'postcss-custom-properties',
  ],
};
