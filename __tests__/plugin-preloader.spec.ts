import preload from "@core/index";
import * as wrappers from "@core/utils/wrappers";
import { sampleBabelConfig, sampleEslintConfig } from "__mock__/configs";

const asyncExecMock = wrappers.asyncExec as jest.Mock;
const syncExecMock = wrappers.syncExec as jest.Mock;

jest.mock("@core/utils/wrappers");

const expectedBabelDependencies =
  "@babel/preset-react@7.0.0 @babel/plugin-transform-runtime@latest @babel/plugin-proposal-decorators@latest @babel/plugin-proposal-private-methods@8.0.0 @babel/preset-env@latest";
const expectedEslintDependencies =
  "@typescript-eslint/eslint-plugin@latest eslint-plugin-abcsize@latest @typescript-eslint/parser@latest";

describe("preload", () => {
  beforeEach(() => {
    syncExecMock.mockClear();
  });

  afterEach(() => {
    syncExecMock.mockRestore();
  });

  test("should not call syncExecMock for ESLint config", async () => {
    preload({ eslint: { extends: ["eslint:recommended"] } });
    expect(asyncExecMock).not.toHaveBeenCalled();
  });

  test("should call syncExec with the correct command for Babel config", () => {
    syncExecMock.mockImplementation(() => {
      return "Mocked stdout";
    });
    preload({ babel: sampleBabelConfig });
    expect(syncExecMock).toHaveBeenCalled();
    expect(syncExecMock.mock.calls[0][0]).toContain(
      `npm install ${expectedBabelDependencies} --no-save --no-audit`
    );
  });

  test("should call syncExec with the correct command for ESLint config", () => {
    syncExecMock.mockImplementation(() => {
      return "Mocked stdout";
    });
    preload({ eslint: sampleEslintConfig });
    expect(syncExecMock).toHaveBeenCalled();
    expect(syncExecMock.mock.calls[0][0]).toContain(
      `npm install ${expectedEslintDependencies} --no-save --no-audit`
    );
  });
});
