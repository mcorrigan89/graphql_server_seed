if (process.env.NODE_ENV === 'production') {
  const { ormConfig } = require('./dist/config');
  module.exports = ormConfig;
} else {
  const { ormConfig } = require('./src/app/config');
  module.exports = ormConfig;
}
