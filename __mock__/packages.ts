const packageJsonEmpty = {
  name: "test-project",
  version: "1.0.0",
};

const packageJsonComplete = {
  ...packageJsonEmpty,
  dependencies: {
    lodash: "^4.17.21",
  },
  devDependencies: {
    jest: "^27.0.6",
  },
};

const packageJsonOnlyDep = {
  ...packageJsonEmpty,
  dependencies: {
    lodash: "^4.17.21",
  },
};

const packageJsonOnlyDev = {
  ...packageJsonEmpty,
  devDependencies: {
    jest: "^27.0.6",
  },
};

export { packageJsonComplete, packageJsonOnlyDep, packageJsonOnlyDev, packageJsonEmpty };
