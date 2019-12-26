const path = require('path');

module.exports = {
    webpackConfig: require('./webpack.config.prod.js'),
    components: 'src/components/**/[A-Z]*.jsx',
    context: {
//        this: path.resolve(__dirname, 'example/Main')
    },
    contextDependencies: [path.resolve(__dirname, 'src/components')]
};