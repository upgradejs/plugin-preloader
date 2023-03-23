import { BabelConfig, ESLintConfig } from "@core/types";

const sampleBabelConfig: BabelConfig = {
  presets: [["@babel/preset-react", undefined, undefined, "7.0.0"]],
  plugins: [
    "@babel/plugin-transform-runtime",
    { name: "@babel/plugin-proposal-private-methods" },
    ["@babel/plugin-proposal-decorators", {}],
    ["@babel/plugin-proposal-private-methods", undefined, undefined, "8.0.0"],
  ],
  env: {
    test: {
      presets: ["@babel/preset-env"],
    },
  },
};

const sampleEslintConfig: ESLintConfig = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["abcsize", "react-hooks"],
  parser: "@typescript-eslint/parser",
};

export { sampleBabelConfig, sampleEslintConfig };
