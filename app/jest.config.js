module.exports = {
    coverageReporters: [
        'lcov',
        'html'
    ],
    coveragePathIgnorePatterns: [
        '\\.(gql|graphql)$',
        '<rootDir>/test',
        '<rootDir>/src/assets/locale'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__testutils__/file.mock.ts'
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    preset: 'ts-jest',
    setupFiles: [
        '<rootDir>/jest.setup.ts',
        '<rootDir>/src/__testutils__/requestAnimationFrame.js'
    ],
    transform: {
        '\\.(gql|graphql)$': '<rootDir>/jest.graphql.js'
    },
    testEnvironment: 'jest-environment-jsdom-global',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
