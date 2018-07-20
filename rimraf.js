const globby = require('globby');
const rimraf = require('rimraf');

globby(['public/*', '!public/fonts', '!public/svg', '!public/images', '!public/lang', '!public/favicon.ico'])
  .then(function then(paths) {
    paths.map(function map(item) {
      rimraf.sync(item);
    });
  });
