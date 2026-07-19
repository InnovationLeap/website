import js from '@eslint/js'
import astro from 'eslint-plugin-astro'
import * as astroParser from 'astro-eslint-parser'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.vite-ssg-temp/**',
      'node_modules/**',
      'public/**',
      'src/content/**',
      'scripts/**',
      'deploy.sh',
      'bunfig.toml',
      'bun.lock'
    ]
  },
  js.configs.recommended,
  ...astro.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,astro}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022
      }
    },
    rules: {
      'indent': ['error', 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoredNodes: ['TemplateLiteral']
      }],
      'linebreak-style': 'off',
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-console': 'off',
      'no-debugger': 'warn',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'curly': ['error', 'multi-line']
    }
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser
    },
    rules: {
      'astro/no-set-html-directive': 'off',
      'astro/no-unused-css-selector': 'warn'
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser
    }
  }
]
