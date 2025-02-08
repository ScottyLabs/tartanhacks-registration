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
    "next/core-web-vitals",
    "prettier"
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
    "@typescript-eslint/quotes": "off",
    camelcase: "off",
    "comma-dangle": "off",
    "no-extra-semi": "error",
    "no-irregular-whitespace": "error",
    "no-lonely-if": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": "error",
    "no-trailing-spaces": "error",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "object-curly-spacing": ["error", "always"],
    semi: ["warn", "always"],
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
