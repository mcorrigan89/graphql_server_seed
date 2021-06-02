const path = require('path');
const projectRoot = path.resolve('.');
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 10
    }
  },
  collectCoverageFrom: ['src/**/*.{ts,js}', '!**/node_modules/**', '!src/index.ts', '!src/graphql/graphql.config.ts', '!src/app/**/*.{ts,js}'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      diagnostics: {
        warnOnly: false // In Case of Emergency Break Glass
      }
    }
  },
  globalSetup: '<rootDir>/test/helpers/globalSetup.ts',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    // https://github.com/kulshekhar/ts-jest/issues/414
    //   "Does not resolve path from tsconfig.js 'paths' option."
    //   so replicate the 'compilerOptions.paths' from `tsconfig.json` here
    //   example:  https://kulshekhar.github.io/ts-jest/user/config/#paths-mapping
    '^[@]graphql/(.+)': '<rootDir>/src/graphql/$1',
    '^[@]services/(.+)': '<rootDir>/src/services/$1',
    '^[@]schema/(.+)': '<rootDir>/src/schema/$1',
    '^[@]data/(.+)': '<rootDir>/src/data/$1',
    '^[@]app/(.+)': '<rootDir>/src/app/$1',
    '^[@]utils/(.+)': '<rootDir>/src/utils/$1',
    '^[@]tests/(.+)': '<rootDir>/tests/$1'
  },
  preset: 'ts-jest/presets/js-with-ts',
  clearMocks: true,
  maxWorkers: 1,
  rootDir: projectRoot,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.{ts,js}', '<rootDir>/src/**/*.test.{ts,js}', '<rootDir>/test/**/*.{ts,js}'],
  testPathIgnorePatterns: ['/test/fixtures/.+$', '/test/helpers/.+$'],
  transform: {
    ...tsjPreset.transform
  },
  verbose: true
};
