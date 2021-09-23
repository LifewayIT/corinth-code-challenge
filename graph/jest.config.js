global.environment = {
    production: false
};

module.exports = {
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    setupFiles: [
        '<rootDir>/jest.setup.ts'
    ],
    transform: {
        '\\.css$': 'jest-raw-loader',
        '\\.sql$': 'jest-raw-loader',
        '\\.txt$': 'jest-raw-loader',
        '^.+\\.tsx?$': 'ts-jest'
    },
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        }
    }
};
