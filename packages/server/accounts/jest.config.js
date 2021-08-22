const { resolve } = require('path');

const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  testEnvironment: 'node',
  restoreMocks: true,
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  collectCoverageFrom: ['**/*.ts', '!**/index.ts', '!**/errors/*.ts', '!**/fakes/*.ts']
};
