const { join } = require('path');

// Register TS compilation.
require('ts-node').register({
  project: join(__dirname, 'scripts/gulp'),
});

require('./scripts/gulp/gulpfile');
