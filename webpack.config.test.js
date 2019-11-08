const util = require('util');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        test: [
            path.resolve(__dirname, './test/test.jsx')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
        	path.resolve(__dirname, 'src'),
        	path.resolve(__dirname, 'node_modules')
        ],
        alias: {
            tedit: path.resolve(__dirname, 'src'),
            comp: path.resolve(__dirname, 'src/comp'),
            lib: path.resolve(__dirname, 'src/lib'),
            util: path.resolve(__dirname, 'src/util'),
            styles: path.resolve(__dirname, 'src/styles')
        }
    },
    module: {
        rules: [{
            test: /\.js$|\.jsx$/,
            use: ['babel-loader'],
            exclude: [/node_modules/, /build/]
        }, {
            test: /\.css|\.less$$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }]
    }
}
