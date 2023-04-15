import getPackageDependencies from "@core/getPackageDependencies";
import {
  packageJsonComplete,
  packageJsonEmpty,
  packageJsonOnlyDep,
  packageJsonOnlyDev,
} from "__mock__/packages";

describe("getPackageDependencies", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("should return an empty array if no dependencies or devDependencies are present", () => {
    jest.mock(`${process.cwd() + "/package.json"}`, () => packageJsonEmpty);

    const result = getPackageDependencies();
    expect(result).toEqual([]);
  });

  it("should return the correct dependencies and devDependencies", () => {
    jest.mock(`${process.cwd() + "/package.json"}`, () => packageJsonComplete);

    const result = getPackageDependencies();
    expect(result).toEqual([
      { nameInRegistry: "lodash", desiredVersion: "^4.17.21" },
      { nameInRegistry: "jest", desiredVersion: "^27.0.6" },
    ]);
  });

  it("should handle the case when only dependencies are present", () => {
    jest.mock(`${process.cwd() + "/package.json"}`, () => packageJsonOnlyDep);

    const result = getPackageDependencies();
    expect(result).toEqual([{ nameInRegistry: "lodash", desiredVersion: "^4.17.21" }]);
  });

  it("should handle the case when only devDependencies are present", () => {
    jest.mock(`${process.cwd() + "/package.json"}`, () => packageJsonOnlyDev);

    const result = getPackageDependencies();
    expect(result).toEqual([{ nameInRegistry: "jest", desiredVersion: "^27.0.6" }]);
  });
});
