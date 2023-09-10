module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'react/react-in-jsx-scope': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/promise-function-async': 'off'
  }
}
