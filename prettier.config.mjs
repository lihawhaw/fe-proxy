/** @type {import("prettier").Config} */
const config = {
  /** 缩进 */
  tabWidth: 2,
  /** 使用制表符 */
  useTabs: false,
  /** 不使用分号 */
  semi: false,
  /** 使用单引号 */
  singleQuote: true,
  /** 在JSX中使用单引号 */
  jsxSingleQuote: true,
  /** 使用尾随逗号 */
  trailingComma: 'all',
  /** 对象内两边空格 */
  bracketSpacing: true,
  /** 省略箭头函数括号 */
  arrowParens: 'avoid',
}

export default config
