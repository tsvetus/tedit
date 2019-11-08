import layout from './layout.js';
import styles from './styles.js';

import {merge} from 'util';

const STYLES = merge(layout, styles);

function registerStyles(styles) {
    if (styles && styles instanceof Object) {
        Object.assign(STYLES, merge(STYLES, styles));
    }
};

export {
    STYLES,
    registerStyles
}