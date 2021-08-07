const { resolve } = require('path');

const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
};
