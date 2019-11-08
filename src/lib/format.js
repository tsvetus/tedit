const NUMBERS = 'NYMDhms';
const CHARS = 'A';

function isMaskCore(char) {
    return NUMBERS.indexOf(char) < 0 && CHARS.indexOf(char) < 0;
}

function isMaskNumber(char) {
    return NUMBERS.indexOf(char) >= 0;
}

function isValueNumber(char) {
    return '0123456789'.indexOf(char) >= 0;
}

function format (mask, empty, value) {
    let result = '';
    for (let i=0; i<mask.length; i++) {
        let from = mask[i];
        let to = empty[0];
        if (isMaskCore(from)) {
            to = from;
        } else if (i < value.length) {
            if (isMaskNumber(from)) {
                if (isValueNumber(value[i])) {
                    to = value[i];
                }
            } else {
                to = value[i];
            }
        }
        result += to;
    }
    return result;
}

class Format {

    constructor(mask, empty, value) {
        this.mask = mask ? mask : '';
        this.empty = empty && empty.length > 0 ? empty[0] : '-';
        this.value = value ? value : '';
        this.value = format(this.mask, this.empty, this.value);
        this.parse = this.parse.bind(this);
        this.correct = this.correct.bind(this);
    }

    correct(event) {

        let val = event.val ? event.val : '';
        let pos = event.pos ? event.pos : '';

        let diff = val.length - this.value.length;

        if (diff === 0) {

        } else if (diff === 1) {
            if (isMaskNumber(this.mask[pos - 1]) && !isValueNumber(val[pos - 1])) {
                val = this.value;
                pos --;
            } else {
                val = val.substr(0, pos) + val.substr(pos + 1);
                if (isMaskCore(this.mask[pos])) {
                    pos ++;
                }
            }
        } else if (diff === -1) {
            val = val.substr(0, pos) + this.empty + val.substr(pos);
        } else {
            val = this.value;
        }

        return {val: val, pos: pos};

    }

    parse(event) {

        let result = this.correct(event);

        this.value = format(this.mask, this.empty, result.val);

        result = {
            val: this.value,
            pos: result.pos
        };

        return result;

    }

}

export default Format;