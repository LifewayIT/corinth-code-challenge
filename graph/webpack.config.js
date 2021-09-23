const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {

    entry: {
        'server': './src/server.ts'
    },
    externals: [nodeExternals()],
    mode: 'development',
    module: {
        rules: [{
            exclude: /.*(__tests__|__mocks__).*/,
            test: /\.(ts)$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        ['@babel/preset-env', {
                            corejs: '3.x',
                            modules: false,
                            targets: {
                                node: '10'
                            },
                            useBuiltIns: 'usage'
                        }],
                    ],
                }
            }, 'ts-loader'],
        }, {
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
            test: /\.(graphql|gql)$/,
        }],
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.graphql', '.gql', '.hbs'],
    },
    target: 'node',

};
