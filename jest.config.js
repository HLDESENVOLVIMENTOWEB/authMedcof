module.exports = {
    preset: 'ts-jest', 
    testEnvironment: 'node',
    roots: ['<rootDir>/src'], 
    testMatch: [
      "<rootDir>/src/tests/*.test.ts",
      "<rootDir>/src/tests/*.spec.ts"
    ],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleDirectories: [
      'node_modules', 
      'src' 
    ],
  };
  