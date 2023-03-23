import { transform } from "@core/utils";
import { sampleBabelConfig, sampleEslintConfig } from "__mock__/configs";

describe("transform Babel config", () => {
  it("should return an array of entities from the Babel configuration", () => {
    const expectedEntities = [
      ["@babel/preset-react", "7.0.0"],
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-decorators",
      ["@babel/plugin-proposal-private-methods", "8.0.0"],
      "@babel/preset-env",
    ];

    const result = transform.babelConfig(sampleBabelConfig);
    expect(result).toEqual(expectedEntities);
  });

  it("should return an empty array of entities from the empty Babel configuration", () => {
    const result = transform.babelConfig({ plugins: [], presets: [] });
    expect(result).toEqual([]);
  });

  it("should return an empty array for the Babel configuration as an empty object", () => {
    const result = transform.babelConfig({});
    expect(result).toEqual([]);
  });

  test("should handle non-array presets and plugins", () => {
    const config = {
      presets: "preset1",
      plugins: "plugin1",
      env: {},
    };
    const result = transform.babelConfig(config);
    expect(result).toEqual([]);
  });

  test("should handle non-array env presets and plugins", () => {
    const config = {
      presets: [],
      plugins: [],
      env: {
        development: {
          presets: "preset1",
          plugins: "plugin1",
        },
      },
    };
    const result = transform.babelConfig(config);
    expect(result).toEqual([]);
  });
});

describe("transform Eslint config", () => {
  it("should return an array of entities from the ESLint configuration", () => {
    const expectedEntities = [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "abcsize",
      "react-hooks",
      "@typescript-eslint/parser",
    ];

    const result = transform.eslintConfig(sampleEslintConfig);
    expect(result).toEqual(expectedEntities);
  });

  it("should return an empty array of entities from the empty ESLint configuration", () => {
    const result = transform.eslintConfig({ plugins: [], extends: [] });
    expect(result).toEqual([]);
  });

  it("should return an array with an entity from the ESLint configuration with extends as a string", () => {
    const result = transform.eslintConfig({ extends: "plugin:security-rules/recommended" });
    expect(result).toEqual(["plugin:security-rules/recommended"]);
  });

  it("should return an empty array for the ESLint configuration as an empty object", () => {
    const result = transform.eslintConfig({});
    expect(result).toEqual([]);
  });
});
