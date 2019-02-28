module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['babel', 'react', 'react-hooks'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
  },
};
