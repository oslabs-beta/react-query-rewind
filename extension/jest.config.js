module.exports = {
  // Specifies the Jest preset - "ts-jest" is used for TypeScript
  preset: 'ts-jest',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "tests/coverage",

  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      // Tells ts-jest to use the isolatedModules mode
      isolatedModules: true,
    },
  },

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // An array of regexp pattern strings that are matched against all test paths
  // This is used to skip test files that are not necessary
  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  // A map from regular expressions to module names or to arrays of module names
  // that allow to stub out resources, like images or styles with a single module
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },

  // This configuration is necessary to transform JSX into JavaScript using Babel
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/jestConfig/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/jestConfig/fileTransform.js'
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
