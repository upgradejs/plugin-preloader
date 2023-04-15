import { asyncPreload, syncPreload } from "@core/index";
import * as wrappers from "@core/utils/wrappers";
import { sampleBabelConfig, sampleEslintConfig } from "__mock__/configs";
import { packageJsonComplete } from "__mock__/packages";

const asyncExecMock = wrappers.asyncExec as jest.Mock;
const syncExecMock = wrappers.syncExec as jest.Mock;

jest.mock("@core/utils/wrappers");

const expectedBabelDependencies =
  "@babel/preset-react@7.0.0 @babel/plugin-transform-runtime@latest @babel/plugin-proposal-decorators@latest @babel/plugin-proposal-private-methods@8.0.0 @babel/preset-env@latest";
const expectedEslintDependencies =
  "@typescript-eslint/eslint-plugin@latest eslint-plugin-abcsize@latest @typescript-eslint/parser@latest";

describe("asyncPreload - checking wrappers.asyncExec calls", () => {
  beforeEach(() => {
    asyncExecMock.mockImplementation(() => {
      return { stdout: "Mocked stdout" };
    });
  });

  afterEach(() => {
    asyncExecMock.mockClear();
  });

  test("should call asyncExec with the correct command for Babel config", async () => {
    await asyncPreload({ babel: sampleBabelConfig });
    expect(asyncExecMock).toHaveBeenCalled();
    expect(asyncExecMock.mock.calls[0][0]).toContain(
      `npm install ${expectedBabelDependencies} --no-save --no-audit`
    );
  });

  test("should not call asyncExecMock for ESLint config", async () => {
    await asyncPreload({ eslint: { extends: ["eslint:recommended"] } });
    expect(asyncExecMock).not.toHaveBeenCalled();
  });

  test("should call asyncExec with the correct command for ESLint config", async () => {
    await asyncPreload({ eslint: sampleEslintConfig });
    expect(asyncExecMock).toHaveBeenCalled();
    expect(asyncExecMock.mock.calls[0][0]).toContain(
      `npm install ${expectedEslintDependencies} --no-save --no-audit`
    );
  });

  test("should call asyncExec with the correct command when withPackageDependencies is true", async () => {
    jest.mock(`${process.cwd() + "/package.json"}`, () => packageJsonComplete);
    await asyncPreload({ babel: sampleBabelConfig, withPackageDependencies: true });
    expect(asyncExecMock).toHaveBeenCalled();
    expect(asyncExecMock.mock.calls[0][0]).toContain(
      `npm install lodash@^4.17.21 jest@^27.0.6 ${expectedBabelDependencies} --no-save --no-audit`
    );
    jest.resetModules();
  });
});

describe("syncPreload - checking wrappers.syncExec calls", () => {
  beforeEach(() => {
    syncExecMock.mockImplementation(() => {
      return "Mocked stdout";
    });
  });

  afterEach(() => {
    syncExecMock.mockClear();
  });

  test("should not call syncExecMock for ESLint config", async () => {
    syncPreload({ eslint: { extends: ["eslint:recommended"] } });
    expect(asyncExecMock).not.toHaveBeenCalled();
  });

  test("should call syncExec with the correct command for Babel config", () => {
    syncPreload({ babel: sampleBabelConfig });
    expect(syncExecMock).toHaveBeenCalled();
    expect(syncExecMock.mock.calls[0][0]).toContain(
      `npm install ${expectedBabelDependencies} --no-save --no-audit`
    );
  });

  test("should call syncExec with the correct command for ESLint config", () => {
    syncPreload({ eslint: sampleEslintConfig });
    expect(syncExecMock).toHaveBeenCalled();
    expect(syncExecMock.mock.calls[0][0]).toContain(
      `npm install ${expectedEslintDependencies} --no-save --no-audit`
    );
  });

  test("should call syncExec with the correct command when withPackageDependencies is true", () => {
    jest.mock(`${process.cwd() + "/package.json"}`, () => packageJsonComplete);
    syncPreload({ babel: sampleBabelConfig, withPackageDependencies: true });
    expect(syncExecMock).toHaveBeenCalled();
    expect(syncExecMock.mock.calls[0][0]).toContain(
      `npm install lodash@^4.17.21 jest@^27.0.6 ${expectedBabelDependencies} --no-save --no-audit`
    );
    jest.resetModules();
  });
});
