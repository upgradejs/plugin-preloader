module.exports = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  coverageReporters: ["text"],
};
