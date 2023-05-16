const { Command } = require("commander");
const { ESLint } = require("eslint");
const { resolve, join } = require("path");
const { promises: fs } = require("fs");
const { parse } = require("@babel/core");
const { asyncPreload } = require("plugin-preloader");

const program = new Command();

async function generateEslintReport({ absolutePath, fileContent, fileName }, config, outputDir) {
  const eslint = new ESLint({
    overrideConfig: config,
    errorOnUnmatchedPattern: false,
    useEslintrc: false,
    cache: false,
  });

  try {
    const lintResult = await eslint.lintText(fileContent, {
      filePath: join(absolutePath, fileName),
    });
    await fs.writeFile(join(outputDir, "eslint.json"), JSON.stringify(lintResult, null, 2));
  } catch (err) {
    console.error(err);
  }
}

async function generateAST({ fileContent, fileName }, config, outputDir) {
  try {
    const ast = await parse(fileContent, { ...config, filename: fileName });
    await fs.writeFile(join(outputDir, "babel.json"), JSON.stringify(ast, null, 2));
  } catch (err) {
    console.error(err);
  }
}

async function analyze(filePath, { babelConfigPath, eslintConfigPath }) {
  const fileName = filePath.split("/").pop();
  const absolutePath = resolve(filePath.split("/").slice(0, -1).join("/"));

  const fileContent = (await fs.readFile(filePath)).toString();

  const options = {
    absolutePath,
    fileContent,
    fileName,
  };

  const babelConfig = babelConfigPath ? require(babelConfigPath) : {};
  const eslintConfig = eslintConfigPath ? require(eslintConfigPath) : {};

  await asyncPreload({ babel: babelConfig, eslint: eslintConfig });

  await generateEslintReport(options, eslintConfig, ".");

  await generateAST(options, babelConfig, ".");
}

program.version("0.1.0").description("plugin-preloader example");

program
  .command("analyze")
  .argument("<file>", "file to analyze")
  .option("-b, --babelConfigPath <babelConfigPath>", "path to babel configuration file")
  .option("-e, --eslintConfigPath <eslintConfigPath>", "path to eslint configuration file")
  .action(analyze);

program.parse();
