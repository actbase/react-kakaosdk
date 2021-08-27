module.exports = {
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
    "env": {
    "browser" : true,
      "node": true
    },
  "parser": "@typescript-eslint/parser",
  "plugins": ["react", "@typescript-eslint/eslint-plugin", "babel"],
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  "globals": { "Promise": true, "setTimeout": true, "FormData": true, "global": true, "document": true },
  "rules": {
    "@typescript-eslint/camelcase": 0
  }
}
