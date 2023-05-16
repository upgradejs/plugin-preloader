# plugin-preloader

This library offers a method for preloading Babel and ESLint packages according to their configurations, ensuring that all necessary packages are installed before initiating any build process. This plugin is designed to dynamically install plugins without the need to include them in your project's dependencies, thus streamlining the setup process.

## Features
- Automatically install Babel and ESLint packages based on their configuration files.
- Supports both latest and specific package versions.

## Installation
To install the library, run the following command:

```shell
npm install --save-dev plugin-preloader
```

## Usage
The `preload` function can operate effectively with standard Babel and ESLint configurations, ensuring that each plugin, preset, parser, or extend is processed and installed at the most recent version.

To designate a specific version rather than the latest for Babel plugins and presets, you can use the fourth element in the plugin/preset definition array item, bypassing the second and third elements - `["@babel/preset-react", undefined, undefined, "7.0.0"]`.

To designate the required version for ESLint plugins, extends, and parsers, use an array instead of a string and place the desired version as the second element in the array - `["plugin:@typescript-eslint/recommended", "3.0.0"]`.

```typescript
const sampleBabelConfig: BabelConfig = {
  presets: [["@babel/preset-react", undefined, undefined, "7.0.0"]],
  plugins: [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", {}],
    ["@babel/plugin-proposal-private-methods", undefined, undefined, "8.0.0"],
  ],
  env: {
    test: {
      presets: [["@babel/preset-env", "7.0.0"]],
    },
  },
};

const sampleEslintConfig: ESLintConfig = {
  extends: [
    "eslint:recommended",
    ["plugin:react/recommended", "6.0.0"],
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["abcsize", ["react-hooks", "2.4.0"]],
  parser: ["@typescript-eslint/parser", "3.4.5"],
};
```

### Preload

```javascript
const preload = require("plugin-preloader");

preload({ babel: sampleBabelConfig, eslint: sampleEslintConfig });
```

In addition, we have provided a sample project in the [example](https://github.com/upgradejs/plugin-preloader/tree/main/example) folder.
## API

`syncPreload({ babel, eslint })`
- Parameters:
  - Object with the following properties:
    - `babel`: [BabelConfig](https://github.com/upgradejs/plugin-preloader/blob/66d1433eae5dc09fdd47ef92f5b2423e2ce8b4f2/src/types/index.ts#L19) object (optional)
    - `eslint`: [ESLintConfig](https://github.com/upgradejs/plugin-preloader/blob/66d1433eae5dc09fdd47ef92f5b2423e2ce8b4f2/src/types/index.ts#L23) object (optional)
- Returns: `void`
- Description: Installs the required packages synchronously based on the Babel and ESLint configurations.

## Known Issues
- **Incompatibility with `pnpm` package manager:** This project may not function correctly with the `pnpm` package manager. It is recommended to use `npm` or `yarn` for better compatibility and a smoother experience

- **Possible disruption of existing dependencies:** Due to the complex nature of the installation process, this project could potentially break already installed dependencies. As a result, your project might not build as expected and may require reinstalling the node modules

- **Restoring the initial node modules structure:** If you encounter issues with your node modules, you can execute the npm prune or yarn install commands to restore the initial node modules structure and resolve any discrepancies. This will help ensure your project builds correctly after using the library

- **Babel plugins/presets definition methods:** This project supports only string as the first item in the Babel plugin/preset definition array. If you use a different method, the library will not be able to install the required packages

- **Lack of support for plugins/presets:** This project has limited support for Babel/ESLint plugins and presets. If you use a plugin/preset not supported by the library, it will not be installed. The supported Babel plugins and presets can be found and added [here](https://github.com/upgradejs/plugin-preloader/tree/5c993bd8110dec4b10d6741854babf3d07692a0e/src/maps/babel). The supported ESLint plugins, extends, and parsers can be found and added [here](https://github.com/upgradejs/plugin-preloader/tree/5c993bd8110dec4b10d6741854babf3d07692a0e/src/maps/eslint)

## Development
In order to start contributing to `plugin-preloader`, you can follow these steps: [CONTRIBUTING.md](CONTRIBUTING.md)

## CHANGELOG
If you want to see what changed between versions: [CHANGELOG.md](CHANGELOG.md)
