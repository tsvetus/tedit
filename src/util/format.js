const NUMBERS = 'NYMDhms';
const CHARS = 'A';

function isMaskCore(char) {
    return char ? NUMBERS.indexOf(char) < 0 && CHARS.indexOf(char) < 0 : false;
}

function isMaskNumber(char) {
    return char ? NUMBERS.indexOf(char) >= 0 : false;
}

function isValueNumber(char) {
    return char ? '0123456789'.indexOf(char) >= 0 : false;
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

    constructor(mask, empty, complete, value) {
        this.mask = mask ? mask : '';
        this.empty = empty && empty.length > 0 ? empty[0] : '-';
        this.value = value ? value : '';
        this.complete = complete;
        this.value = format(this.mask, this.empty, this.value);
        this.parse = this.parse.bind(this);
        this.correct = this.correct.bind(this);
        this.completed = this.completed.bind(this);
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
                while (isMaskCore(this.mask[pos])) {
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

    completed() {
        return this.complete ? this.value.indexOf(this.empty) < 0 : true;
    }

}

export default Format;