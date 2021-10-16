/* eslint-disable */

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "@typescript-eslint/camelcase": ["off", { properties: "never" }],
    "@typescript-eslint/quotes": ["error", "double"],
    camelcase: "off",
    "comma-dangle": ["error", "never"],
    indent: ["error", 2],
    "no-extra-semi": 2,
    "no-irregular-whitespace": 2,
    "no-lonely-if": 2,
    "no-multi-spaces": 2,
    "no-multiple-empty-lines": 2,
    "no-trailing-spaces": 2,
    "no-unexpected-multiline": 2,
    "no-unreachable": "error",
    "object-curly-spacing": ["error", "always"],
    semi: ["warn", "never"],
    "import/no-anonymous-default-export": ["off"],
    "react-hooks/rules-of-hooks": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "react/display-name": ["off"]
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        project: "path/to/folder",

        // Multiple tsconfigs (Useful for monorepos)

        // use a glob pattern
        project: "packages/*/tsconfig.json",

        // use an array
        project: [
          "packages/module-a/tsconfig.json",
          "packages/module-b/tsconfig.json"
        ],

        // use an array of glob patterns
        project: ["packages/*/tsconfig.json", "other-packages/*/tsconfig.json"]
      }
    }
  }
}
