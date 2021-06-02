if (process.env.NODE_ENV === 'production') {
  const { connectionOptions } = require('./dist/app/config');
  module.exports = connectionOptions;
} else {
  const { connectionOptions } = require('./src/app/config');
  module.exports = connectionOptions;
}
