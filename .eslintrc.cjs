/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: false,
    },
  },
  extends: ['plugin:vue/strongly-recommended', 'airbnb-base'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
      },
    },
  },
  rules: {
    'linebreak-style': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'vue/no-v-model-argument': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
};
