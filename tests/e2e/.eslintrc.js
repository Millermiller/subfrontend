module.exports = {
  "root": true,
  "extends": [
    "plugin:cypress/recommended"
  ],
  plugins: [
    'cypress',
  ],
  env: {
    mocha: true,
    'cypress/globals': true,
  },
  rules: {
    strict: 'off',
  },
};
