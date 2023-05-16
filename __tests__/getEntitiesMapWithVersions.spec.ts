import getEntitiesMapWithVersions from "@core/getEntitiesMapWithVersions";
import { babelMap, eslintMap } from "@core/maps";
import { Entity } from "@core/types";

describe("getEntitiesMapWithVersions", () => {
  it("returns expected map with versions for Babel config", () => {
    const entities = [
      "@babel/plugin-transform-typescript",
      ["@babel/preset-react", "7.0.0"],
    ] as Entity[];

    const result = getEntitiesMapWithVersions(entities, {
      ...babelMap.presets,
      ...babelMap.plugins,
    });

    expect(result).toEqual({
      "@babel/plugin-transform-typescript": {
        nameInRegistry: "@babel/plugin-transform-typescript",
        desiredVersion: "latest",
      },
      "@babel/preset-react": {
        nameInRegistry: "@babel/preset-react",
        desiredVersion: "7.0.0",
      },
    });
  });

  it("returns expected map with versions for ESLint config", () => {
    const entities = [
      ["plugin:security-rules/recommended", "7.0.0"],
      "@babel/preset-flow",
      "plugin:@typescript-eslint/recommended",
      "@typescript-eslint/parser",
    ] as Entity[];

    // TODO: Mock the node_modules folder to prevent updating tests every time whn modules are updated
    const result = getEntitiesMapWithVersions(entities, {
      ...eslintMap.plugins,
      ...eslintMap.extendsMap,
      ...eslintMap.parser,
    });

    expect(result).toEqual({
      "plugin:security-rules/recommended": {
        nameInRegistry: "eslint-plugin-security-rules",
        desiredVersion: "7.0.0",
      },
      "plugin:@typescript-eslint/recommended": {
        nameInRegistry: "@typescript-eslint/eslint-plugin",
        currentVersion: "5.56.0",
        desiredVersion: "5.59.6",
      },
      "@typescript-eslint/parser": {
        nameInRegistry: "@typescript-eslint/parser",
        currentVersion: "5.56.0",
        desiredVersion: "5.59.6",
      },
    });
  });
});
