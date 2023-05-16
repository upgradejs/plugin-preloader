# main (unreleased)

# 1.0.0
- Breaking change: the `asyncPreload` method was removed to ensure that dependencies will be installed before the program execution. The project now exports only the sync version of the `preload` method, and it is a default export. 

# 0.3.1
- Fix ESLint configuration in example project

# 0.3.0
- Add support for ESLint parser: `@babel/eslint-parser`

# 0.2.0
- Add support for Babel plugins: `@babel/plugin-transform-runtime`, `@babel/plugin-proposal-class-properties`, `@babel/plugin-proposal-export-namespace-from`, `styled-components`
- Add support for Babel presets: `@babel/preset-flow`
- Add support for ESLint extends: `airbnb`, `prettier`, `prettier/react`, `plugin:prettier/recommended`, `plugin:flowtype/recommended`
- Add support for ESLint plugins: `flowtype`, `@typescript-eslint`, `sonarjs`
- Add support for ESLint parser: `babel-eslint`

# 0.1.2
- Extend and improve usage, API and known issues sections in the README.md. 

# 0.1.1
- Fix missing dist folder in the published package.

# 0.1.0
- Initial implementation of the library.
