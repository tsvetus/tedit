import defaultLayout from './layout.js';
import defaultStyles from './styles.js';

import {merge} from '../util';

const styles = merge(defaultLayout, defaultStyles);

function registerStyles(customStyles) {
    if (customStyles && customStyles instanceof Object) {
        Object.assign(styles, merge(styles, customStyles));
    }
}

export {
    styles,
    registerStyles
}