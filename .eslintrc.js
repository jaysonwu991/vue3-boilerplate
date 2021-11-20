module.exports = {
  root: true,
  env: {
    amd: true,
    es6: true,
    node: true,
    jest: true,
    browser: true,
    commonjs: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['babel', 'import', 'prettier'],
  extends: ['eslint:recommended', 'plugin:vue/vue3-strongly-recommended', 'prettier/prettier'],
  rules: {
    'prettier/prettier': 0,
    semi: [2, 'always'],
    quotes: [2, 'single'],
    'object-curly-spacing': [2, 'always'],
    'array-bracket-spacing': [2, 'never'],
    'import/no-duplicates': 2,
    'import/named': 0,
    'array-callback-return': 2,
    'consistent-return': 2,
    'babel/no-invalid-this': 2,
    'comma-spacing': [2, { before: false, after: true }],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'no-unused-vars': [
      1,
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'vue/singleline-html-element-content-newline': 0,
  },
};
