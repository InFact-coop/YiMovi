module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'array-bracket-spacing': [ 'error', 'always', ],
    'comma-dangle': [ 'error', 'always', ],
    indent: [ 'error', 2, ],
    'linebreak-style': [ 'error', 'unix', ],
    'object-curly-spacing': [ 'error', 'always', ],
    quotes: [ 'error', 'single', ],
    semi: [ 'error', 'always', ],
    'space-in-parens': [ 'error', 'never', ],
  },
};
