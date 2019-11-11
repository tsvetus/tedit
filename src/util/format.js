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

        let value = event.value ? event.value : '';
        let caret = event.caret ? event.caret : '';

        let diff = value.length - this.value.length;

        if (diff === 0) {

        } else if (diff === 1) {
            if (isMaskNumber(this.mask[caret - 1]) && !isValueNumber(value[caret - 1])) {
                value = this.value;
                caret --;
            } else {
                value = value.substr(0, caret) + value.substr(caret + 1);
                while (isMaskCore(this.mask[caret])) {
                    caret ++;
                }
            }
        } else if (diff === -1) {
            value = value.substr(0, caret) + this.empty + value.substr(caret);
        } else {
            value = this.value;
        }

        return {value: value, caret: caret};

    }

    parse(event) {

        let result = this.correct(event);

        this.value = format(this.mask, this.empty, result.value);

        result = {
            value: this.value,
            caret: result.caret
        };

        return result;

    }

    completed() {
        return this.complete ? this.value.indexOf(this.empty) < 0 : true;
    }

}

export default Format;