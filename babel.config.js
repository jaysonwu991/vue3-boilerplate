const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
        modules: isDev && 'auto',
      },
    ],
  ],
};
