module.exports = {
  // 此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  // 全局环境
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 指定ESlint的解析器
    parser: '@typescript-eslint/parser',
    // 允许使用ES语法
    ecmaVersion: 'latest',
    // 允许使用import
    sourceType: 'module',
    // 允许解析JSX
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    'prettier/prettier': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // 'vue/script-setup-uses-vars': 'error',
    'vue/no-v-html': 'off',
    'vue/comment-directive': 'off',
    'vue/max-attributes-per-line': ['off'],
  },
}
