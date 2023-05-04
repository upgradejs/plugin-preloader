# plugin-preloader-example

This project is an example of how to use the **plugin-preloader** package to load Babel and ESLint plugins.

## How to use
1. Clone the project - `git clone git@github.com:upgradejs/plugin-preloader.git`
2. Navigate to the example folder - `cd plugin-preloader/example`
3. Run - `npm install`
4. You are ready to try it out, there are two testing sub-projects under inside _external-projects_ folder. You can run the following commands to test them:
    - To test **plugin-preloader** on the _typescript-based_ project, run - `node index.js analyze ./external-projects/typescript/src/index.ts -b ./external-projects/typescript/babel.config.js -e ./external-projects/typescript/.eslintrc.js`
    - To test **plugin-preloader** on the _flow-based_ project, run - `node index.js analyze ./external-projects/flow/src/index.js -b ./external-projects/javascript/babel.config.js -e ./external-projects/javascript/.eslintrc.js`
5. As a result, in the root of the _example_ folder, two files will be created - _babel.json_ and _eslint.json_ with the analysis results.

## Notes
You can play with this project and try to run it on your files. All you need is to change the paths to the desired file, Babel, and ESLint configs in the commands above.
