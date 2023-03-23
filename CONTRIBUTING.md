# Contributing

## Getting Started

Clone the repo and install dependencies:

```bash
git clone git@github.com:upgradejs/plugin-preloader.git
cd plugin-preloader
npm install
```

To be able to test running the project locally:

```bash
npm run build
npm link
```

## How it works

### Components
This library consists of the following main components:

- **Preload Functions**: `syncPreload` and `asyncPreload` functions are responsible for installing the required Babel and ESLint packages based on their configurations.

- **Configuration Transformers**: `transformBabelConfig` and `transformEslintConfig` functions are used to transform Babel and ESLint configurations into an array of package names and versions.

- **Maps**: The `babelMap` and `eslintMap` objects contain mappings of package names to their corresponding registry names.

- **Utility Functions**: Functions like `getEntitiesMapWithVersionsSync`, `getEntitiesMapWithVersionsAsync`, and various wrappers are provided to help with the internal workings of the library.

### Workflow
Here is a high-level overview of the workflow for preloading Babel and ESLint packages:

1. **Input**: The user provides Babel and/or ESLint configurations to the `syncPreload` or `asyncPreload` functions.

2. **Configuration Transformation**: The configurations are transformed using the `transformBabelConfig` and `transformEslintConfig` functions, resulting in an array of package names and versions.

3. **Mapping**: The transformed package names are mapped to their corresponding registry names using the `babelMap` and `eslintMap` objects.

4. **Version Check**: For each package, the current and desired versions are checked and compared. If the desired version is "latest", the remote latest version is fetched using `npm view`.

5. **Installation**: If any packages need to be installed, they are installed using npm install with the `--no-save` and `--no-audit` flags.

6. **Output**: The library logs the packages to be installed and the output of the npm install command.

## When Submitting a Pull Request:

- If your PR closes any open GitHub issues, please include `Closes #XXXX` in your comment.
- Please include a line in the CHANGELOG.md so that it's easier to release new versions.
- Please include a summary of the change and which issue is fixed or which feature is introduced.
- If changes to the behavior are made, clearly describe what are the changes and why.
- If changes to the UI are made, please include screenshots of the before and after.
