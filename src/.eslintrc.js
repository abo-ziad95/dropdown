module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'prefer-const': ['error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'no-var': 'error',
    'no-new-object': 'error',
    'object-shorthand': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'no-array-constructor': 'error',
    'prefer-destructuring': [
      'error', {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      }],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    'no-eval': 'error',
    'no-useless-escape': 'error',
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'wrap-iife': ['error', 'outside'],
    'prefer-rest-params': 'error',
    'no-new-func': 'error',
    'space-before-function-paren': [
      'error', { anonymous: 'never', named: 'never', asyncArrow: 'always' },
    ],
    'prefer-spread': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-spacing': ['error', { before: true, after: true }],
    'arrow-body-style': ['error', 'as-needed'],
    'no-confusing-arrow': 'error',
    'no-useless-constructor': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': 'error',
    'import/no-mutable-exports': 'error',
    'import/prefer-default-export': 'warn',
    'import/first': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'generator-star-spacing': [
      'error', {
        before: false, after: true,
        anonymous: 'after', method: { before: true, after: true },
      }],
    'dot-notation': ['error', { allowKeywords: true }],
    'no-undef': 'error',
    'one-var': ['error', 'never'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-case-declarations': 'error',
    'no-unneeded-ternary': 'error',
    'brace-style': ['error', '1tbs'],
    'spaced-comment': ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1 }], // TODO: discuss
    'space-before-blocks': ['error', 'always'],
    'keyword-spacing': ['error', { before: true }],
    'space-infix-ops': 'error',
    'eol-last': 'error',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-whitespace-before-property': 'error',
    'padded-blocks': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    curly: ['error', 'all'],
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'no-implicit-coercion': ['error'],
    radix: ['error', 'as-needed'],
    'id-length': ['error', {
      properties: 'never',
      exceptions: ['x', 'y', 'z', 'h', 'm', 's', '_', 'i', 'j', 'a', 'b'],
    }],
  },
};