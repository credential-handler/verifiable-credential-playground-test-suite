// Require all sibling `cjs` files of `index.cjs` and re-export them.
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if(file.match(/\.cjs$/) !== null && file !== 'index.cjs') {
    const name = file.replace('.cjs', '');
    exports[name] = require('./' + file);
  }
});
