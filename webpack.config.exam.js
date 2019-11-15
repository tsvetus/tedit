const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        test: [
            path.resolve(__dirname, './example/example.jsx')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        publicPath: '/',
        filename: 'example.js'
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
    }
};
