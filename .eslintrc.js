module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest"],
  extends: [
    "airbnb-typescript/base",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:jest/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "import/prefer-default-export": [0],
  },
}
