module.exports = {
  root: true,
  env: {
    'shared-node-browser': true
  },
  extends: [
    'digitalbazaar',
    'digitalbazaar/jsdoc'
  ],
  ignorePatterns: ['node_modules/']
};
