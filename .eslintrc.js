module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeature: {
      jsx: true,
      legacyDecorators: false,
    },
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
    {
      files: ['*.html'],
      plugins: ['html'],
    },
  ],
  rules: {
    'no-throw-literal': 'warn',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-empty-pattern': 'off', // 进制空结构
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'only-multiline'], // 要求或禁止末尾逗号
    'comma-style': ['error', 'last'], // 强制使用一致的逗号风格
    'func-call-spacing': ['error', 'never'], // 要求或禁止在函数标识符和其调用之间有空格
    indent: ['error', 2], // 缩进 2字符
    'no-mixed-operators': 'error', // 禁止混合使用不同的操作符
    'no-mixed-spaces-and-tabs': 'error', // 禁止空格和 tab 的混合缩进
    'semi-style': ['error', 'last'], // 强制分号的位置
    quotes: ['error', 'single'], // 单引号
    semi: ['error', 'never'], // 进制末尾分号
    'padded-blocks': ['error', 'never'], // 要求或禁止块内填充
    'space-before-function-paren': ['error', 'never'], // 强制在 function的左括号之前使用一致的空格
    'no-extend-native': 'off', // 禁止扩展原生类型
    eqeqeq: ['error', 'smart'], // 要求使用 === 和 !==
    'prefer-promise-reject-errors': 'off', // 要求使用 Error 对象作为 Promise 拒绝的原因
    'no-tabs': ['error', { allowIndentationTabs: true }], // 禁用 tab
  },
}
