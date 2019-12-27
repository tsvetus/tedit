const path = require('path');

module.exports = {
    webpackConfig: require('./webpack.config.prod.js'),
    components: 'src/components/**/[A-Z]*.jsx',
    styleguideDir: 'docs/styleguide',
    sortProps: props => props,
    getComponentPathLine: function(componentPath) {
        const name = path.basename(componentPath, '.jsx');
        return `import {${name}} from 'tedit';`
    }
};