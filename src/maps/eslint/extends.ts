import { Map } from "@core/types";

const extendsMap: Map = {
  "plugin:security/recommended": {
    nameInRegistry: "eslint-plugin-security",
  },
  "plugin:security-rules/recommended": {
    nameInRegistry: "eslint-plugin-security-rules",
  },
  "plugin:abcsize/recommended": {
    nameInRegistry: "eslint-plugin-abcsize",
  },
  "plugin:sonarjs/recommended": {
    nameInRegistry: "eslint-plugin-sonarjs",
  },
  "plugin:n/recommended": {
    nameInRegistry: "eslint-plugin-n",
  },
  "plugin:@typescript-eslint/recommended": {
    nameInRegistry: "@typescript-eslint/eslint-plugin",
  },
  airbnb: {
    nameInRegistry: "eslint-config-airbnb",
  },
  prettier: {
    nameInRegistry: "eslint-config-prettier",
  },
  "prettier/react": {
    nameInRegistry: "eslint-config-prettier",
  },
  "plugin:prettier/recommended": {
    nameInRegistry: "eslint-plugin-prettier",
  },
  "plugin:flowtype/recommended": {
    nameInRegistry: "eslint-plugin-flowtype",
  },
};

export default extendsMap;
