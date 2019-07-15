module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    // ecmaFeatures: {
    //   jsx: true,
    // },
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
};