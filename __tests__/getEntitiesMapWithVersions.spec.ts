import {
  getEntitiesMapWithVersionsAsync,
  getEntitiesMapWithVersionsSync,
} from "@core/getEntitiesMapWithVersions";
import { babelMap, eslintMap } from "@core/maps";
import { Entity } from "@core/types";

describe("getEntitiesMapWithVersionsSync", () => {
  it("returns expected map with versions for Babel config", () => {
    const entities = [
      "@babel/plugin-transform-typescript",
      ["@babel/preset-react", "7.0.0"],
    ] as Entity[];

    const result = getEntitiesMapWithVersionsSync(entities, {
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

    const result = getEntitiesMapWithVersionsSync(entities, {
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
        desiredVersion: "5.56.0",
      },
      "@typescript-eslint/parser": {
        nameInRegistry: "@typescript-eslint/parser",
        currentVersion: "5.56.0",
        desiredVersion: "5.56.0",
      },
    });
  });
});

describe("getEntitiesMapWithVersionsAsync", () => {
  it("returns expected map with versions for Babel config", async () => {
    const entities = [
      "@babel/plugin-transform-typescript",
      ["@babel/preset-react", "7.0.0"],
    ] as Entity[];

    const result = await getEntitiesMapWithVersionsAsync(entities, {
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

  it("returns expected map with versions for ESLint config", async () => {
    const entities = [
      ["plugin:security-rules/recommended", "7.0.0"],
      "@babel/preset-preact",
      "plugin:@typescript-eslint/recommended",
      "@typescript-eslint/parser",
    ] as Entity[];

    const result = await getEntitiesMapWithVersionsAsync(entities, {
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
        desiredVersion: "5.56.0",
      },
      "@typescript-eslint/parser": {
        nameInRegistry: "@typescript-eslint/parser",
        currentVersion: "5.56.0",
        desiredVersion: "5.56.0",
      },
    });
  });
});
