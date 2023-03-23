# plugin-preloader

This library offers a method for preloading Babel and ESLint packages according to their configurations, ensuring that all necessary packages are installed before initiating any build process. This plugin is designed to dynamically install plugins without the need to include them in your project's dependencies, thus streamlining the setup process.

## Features
- Automatically install Babel and ESLint packages based on their configuration files.
- Sync and async preload methods.
- Supports both latest and specific package versions.

## Installation
To install the library, run the following command:

```shell
npm install --save-dev plugin-preloader
```

## Usage
To work correctly these methods should be called before any build process is initiated.

### Async Preload
```typescript
import { asyncPreload } from "plugin-preloader";

async function main() {
  const babelConfig = {...};
  const eslintConfig = {...};

  await asyncPreload({ babel: babelConfig, eslint: eslintConfig });
}

main();
```

### Sync Preload

```javascript
const { syncPreload } = require("plugin-preloader");

const babelConfig = {...};
const eslintConfig = {...};

syncPreload({ babel: babelConfig, eslint: eslintConfig });
```

## API

**syncPreload({ babel, eslint })**
- Parameters:
  - `babel`: BabelConfig object (optional)
  - `eslint`: ESLintConfig object (optional)
- Returns: `void`
- Description: Installs the required packages synchronously based on the Babel and ESLint configurations.

**asyncPreload({ babel, eslint })**
- Parameters:
  - `babel`: BabelConfig object (optional)
  - `eslint`: ESLintConfig object (optional)
- Returns: `Promise<void>`
- Description: Installs the required packages asynchronously based on the Babel and ESLint configurations.

##Known Issues
- **Incompatibility with pnpm package manager:** This project may not function correctly with the pnpm package manager. It is recommended to use npm or yarn for better compatibility and a smoother experience.

- **Possible disruption of existing dependencies:** Due to the complex nature of the installation process, this project could potentially break already installed dependencies. As a result, your project might not build as expected and may require reinstalling the node modules.

- **Restoring the initial node modules structure:** If you encounter issues with your node modules, you can execute the npm prune or yarn install commands to restore the initial node modules structure and resolve any discrepancies. This will help ensure your project builds correctly after using the library.

## Development
In order to start contributing to `plugin-preloader`, you can follow these steps: [CONTRIBUTING.md](CONTRIBUTING.md)

## CHANGELOG
If you want to see what changed between versions: [CHANGELOG.md](CHANGELOG.md)
