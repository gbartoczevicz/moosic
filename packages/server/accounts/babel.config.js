module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: '.',
        alias: {
          '@': './src'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
};
