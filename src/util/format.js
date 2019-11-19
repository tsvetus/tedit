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

class Format {

    constructor(mask, empty, full, value) {
        this.correct = this.correct.bind(this);
        this.format = this.format.bind(this);
        this.parse = this.parse.bind(this);
        this.mask = mask ? mask : '';
        this.empty = empty && empty.length > 0 ? empty[0] : '-';
        this.value = value ? value : '';
        this.full = full;
        this.value = this.format(this.mask, this.empty, this.value);
        this.isFull = false;
        this.isEmpty = false;
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

    format(mask, empty, value) {
        let result = '';
        let total = 0;
        let found = 0;
        for (let i=0; i<mask.length; i++) {
            let from = mask[i];
            let to = empty[0];
            if (isMaskCore(from)) {
                to = from;
            } else {
                total++;
                if (value && i < value.length) {
                    if (isMaskNumber(from)) {
                        if (isValueNumber(value[i])) {
                            found++;
                            to = value[i];
                        }
                    } else {
                        found++;
                        to = value[i];
                    }
                }
            }
            result += to;
        }
        this.isEmpty = found === 0;
        this.isFull = total === found;
        return result;
    }

    parse(event) {

        let result = this.correct(event);

        this.value = this.format(this.mask, this.empty, result.value);

        result = {
            value: this.value,
            caret: result.caret,
            full: this.isFull,
            empty: this.isEmpty
        };

        return result;

    }

}

export default Format;