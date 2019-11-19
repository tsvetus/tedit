import {REGEXP} from './const.js';

export function isoDate(mask, source) {
    if (source instanceof Date) {
        return source.toISOString().substr(0, 10);
    } else if (source && mask) {
        let d = mask.indexOf('DD') >= 0 ? source.substr(mask.indexOf('DD'), 2) : '01';
        let m = mask.indexOf('MM') >= 0 ? source.substr(mask.indexOf('MM'), 2) : '01';
        let y = mask.indexOf('YYYY') >= 0 ? source.substr(mask.indexOf('YYYY'), 4) : '1970';
        return y + '-' + m + '-' + d;
    }
    return null;
}

export function strDate(mask, empty, source) {

    let str = null;
    if (source instanceof Date) {
        let offset = 0;
        let d = new Date(source.getTime() - offset*60*1000);
        str = d.toISOString().substr(0, 10);
    } else if (REGEXP.isoDate.test(source)) {
        str = source.substr(0, 10);
    } else {
        return source;
    }

    let d = str.substr(8, 2);
    let m = str.substr(5, 2);
    let y = str.substr(0, 4);

    return mask.replace('DD', d).replace('MM', m).replace('YYYY', y);

}

function leapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export function testIsoDate(source) {
    if (REGEXP.isoDate.test(source)) {
        let d = Number.parseInt(source.substr(8, 2));
        let m = Number.parseInt(source.substr(5, 2));
        let y = Number.parseInt(source.substr(0, 4));
        if ([1, 3, 5, 7, 8, 10, 12].indexOf(m) >= 0) {
            return d > 0 && d <= 31;
        } else if ([4, 6, 9, 11].indexOf(m) >= 0) {
            return d > 0 && d <= 30;
        } else if (m === 2) {
            if (leapYear(Number.parseInt(y))) {
                return d > 0 && d <= 29;
            } else {
                return d > 0 && d <= 28;
            }
        }
    } else {
        return false;
    }
}