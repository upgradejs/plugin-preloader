import { asyncPreload, syncPreload } from "@core/index";
import * as wrappers from "@core/utils/wrappers";
import { sampleBabelConfig, sampleEslintConfig } from "__mock__/configs";

const asyncExecMock = wrappers.asyncExec as jest.Mock;
const syncExecMock = wrappers.syncExec as jest.Mock;

jest.mock("@core/utils/wrappers");

const expectedBabelDependencies =
  "@babel/preset-react@7.0.0 @babel/plugin-proposal-decorators@latest @babel/plugin-proposal-private-methods@8.0.0 @babel/preset-env@latest";
const expectedEslintDependencies =
  "@typescript-eslint/eslint-plugin@latest eslint-plugin-abcsize@latest @typescript-eslint/parser@latest";

describe("asyncPreload - checking wrappers.asyncExec calls", () => {
  beforeEach(() => {
    asyncExecMock.mockClear();
  });

  afterEach(() => {
    asyncExecMock.mockRestore();
  });

  test("should call asyncExec with the correct command for Babel config", async () => {
    asyncExecMock.mockImplementation(async () => {
      return { stdout: "Mocked stdout" };
    });
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
    asyncExecMock.mockImplementation(async () => {
      return { stdout: "Mocked stdout" };
    });
    await asyncPreload({ eslint: sampleEslintConfig });
    expect(asyncExecMock).toHaveBeenCalled();
    expect(asyncExecMock.mock.calls[0][0]).toContain(
      `npm install ${expectedEslintDependencies} --no-save --no-audit`
    );
  });
});

describe("syncPreload - checking wrappers.syncExec calls", () => {
  beforeEach(() => {
    syncExecMock.mockClear();
  });

  afterEach(() => {
    syncExecMock.mockRestore();
  });

  test("should not call syncExecMock for ESLint config", async () => {
    syncPreload({ eslint: { extends: ["eslint:recommended"] } });
    expect(asyncExecMock).not.toHaveBeenCalled();
  });

  test("should call syncExec with the correct command for Babel config", () => {
    syncExecMock.mockImplementation(() => {
      return "Mocked stdout";
    });
    syncPreload({ babel: sampleBabelConfig });
    expect(syncExecMock).toHaveBeenCalled();
    expect(syncExecMock.mock.calls[0][0]).toContain(
      `npm install ${expectedBabelDependencies} --no-save --no-audit`
    );
  });

  test("should call syncExec with the correct command for ESLint config", () => {
    syncExecMock.mockImplementation(() => {
      return "Mocked stdout";
    });
    syncPreload({ eslint: sampleEslintConfig });
    expect(syncExecMock).toHaveBeenCalled();
    expect(syncExecMock.mock.calls[0][0]).toContain(
      `npm install ${expectedEslintDependencies} --no-save --no-audit`
    );
  });
});
