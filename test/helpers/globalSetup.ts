// because
//   `jest -r tsconfig-paths/register` doesn't work
//   jest.config.js + `setupFiles` (etc.) don't work either
import 'tsconfig-paths/register';

exports = module.exports = async function globalSetup() {
  // noop
};
