const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        example: [
            path.resolve(__dirname, './docgen/index.jsx')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        publicPath: '/',
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
        	path.resolve(__dirname, 'src'),
        	path.resolve(__dirname, 'node_modules')
        ],
        alias: {
            tedit: path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [{
            test: /\.js$|\.jsx$/,
            use: ['babel-loader'],
            exclude: [/node_modules/, /build/]
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'docs'),
        publicPath: '/',
        port: 7070,
        host: '0.0.0.0'
    }
};
