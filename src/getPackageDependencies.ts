const getPackageDependencies = () => {
  const packageJson = require(process.cwd() + "/package.json");
  const dependencies = packageJson.dependencies;
  const devDependencies = packageJson.devDependencies;
  return Object.entries({ ...dependencies, ...devDependencies }).map(([name, version]) => ({
    nameInRegistry: name,
    desiredVersion: version as string,
  }));
};

export default getPackageDependencies;
