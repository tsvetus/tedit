class Helper {

    constructor () {
        this.items = [];
        this.struct = null;
        this.getStruct = this.getStruct.bind(this);
        this.getValue = this.getValue.bind(this);
        this.getMode = this.getMode.bind(this);
        this.getItems = this.getItems.bind(this);
        this.getItem = this.getItem.bind(this);
        this.hasItems = this.hasItems.bind(this);
        this.load = this.load.bind(this);
    }

    getStruct(items, empty) {

        if (items === undefined && empty === undefined) {
            return this.struct;
        }

        let item = null;

        if (items && items.length > 0) {
            item = items[0];
        } else if (empty) {
            item = empty;
        }

        if (item) {
            if (item instanceof Object) {
                let key = null;
                let value = null;
                let i = 0;
                for (let field in item) {
                    if (i === 0) {
                        key = field;
                    } else if (i === 1) {
                        value = field;
                    } else {
                        break;
                    }
                    i++;
                }
                if (key !== null && value !== null) {
                    return {key: key, value: value}
                }
            }
        }

        return null;

    }

    getMode(mode) {
        if (mode && (mode.indexOf('key') >= 0 || mode.indexOf('val') >= 0)) {
            return mode;
        } else {
            return 'val';
        }
    }

    getValue(item) {
        let value = '';
        if (this.mode.indexOf('key') >= 0) {
            value += item[this.struct.key];
        }
        if (this.mode.indexOf('val') >= 0) {
            if (value === '') {
                value += item[this.struct.value];
            } else {
                value += ' ' + item[this.struct.value];
            }
        }
        return value;
    }

    getItem(value) {
        let item = this.items.find( v =>{
            return v.key == value;
        });
        return item;
    }

    load(items, empty, mode) {

        this.items = [];
        this.mode = this.getMode(mode);
        this.struct = this.getStruct(items, empty);

        if (this.struct) {

            if (empty) {
                this.items.push({
                    index: -1,
                    key: empty[this.struct.key],
                    value: empty[this.struct.value]
                });
            }

            if (items) {
                items.forEach((v, i) => {
                    this.items.push({
                        index: i,
                        key: v[this.struct.key],
                        value: this.getValue(v)
                    });
                });
            }

        }

    }

    getItems() {
        return this.items;
    }

    hasItems() {
        return this.items && this.items.length > 0;
    }

}

export default Helper;