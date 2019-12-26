export function merge(...sources) {
    let res = {};
    for (const source of sources) {
        if (source instanceof Array) {
            if (!(res instanceof Array)) {
                res = []
            }
            res = [...res, ...source]
        } else if (source instanceof Object) {
            for (let [key, value] of Object.entries(source)) {
                if (value instanceof Object && key in res) {
                    value = merge(res[key], value)
                }
                res = { ...res, [key]: value }
            }
        }
    }
    return res;
}

export function apply(from, to, style) {

    if (!from || !to || !style) {
        return;
    }

    let f = Object.keys(from);
    let t = Object.keys(to);

    for (let i=0; i<t.length; i++) {
        style[t[i]] = to[t[i]];
    }

    if (from) {
        for (let i=0; i<f.length; i++) {
            if (t.indexOf(f[i]) < 0) {
                style[f[i]] = null;
            }
        }
    }

}

export function nvl(source, def) {
    if (source === null || source === undefined) {
        return def;
    } else {
        return source;
    }
}

export function clone(source) {
    let dest = null;
    if (source instanceof Array) {
        dest = source.slice();
        for (let i=0; i<dest.length; i++) {
            dest[i] = clone(dest[i]);
        }
    } else if (source instanceof Object) {
        dest = Object.assign({}, source);
        let keys = Object.keys(dest);
        for (let i=0; i<keys.length; i++) {
            dest[keys[i]] = clone(dest[keys[i]]);
        }
    } else {
        dest = source;
    }
    return dest;
}

export function download(url, filename) {
    let link = document.createElement("a");
    if (filename) {
        link.download = filename;
    }
    link.target = "_blank";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function seconds(source) {
    return Date.parse('1970 ' + source + ' GMT')/1000;
}

export function find(node, parent) {
    if (!node) {
        return null;
    }
    if (node === parent) {
        return parent;
    }
    if (parent && parent.children) {
        for (let i=0; i<parent.children.length; i++) {
            let child = parent.children[i];
            if (node === child) {
                return child
            }
            let found = find(node, child);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

export function strip(source) {
    return source
        .replace(/<br>/gm, '\r')
        .replace(/<[^>]*>?/gm, '')
        .replace(/&(.*?);+/gm, ' ');
}

export function flood(source) {

    let arr = source
        .replace(/\r/gm, '<br>')
        .replace(/<[^>]*>?/gm, '')
        .split(' ');

    let res = '';

    if (arr.length > 0) {
        res = arr[0];
        for (let i=1; i<arr.length; i++) {
            if (arr[i - 1] !== '' && arr[i] !== '') {
                res += ' ' + arr[i];
            } else {
                res += '&nbsp;' + arr[i];
            }
        }
    }

    return res;

}

export function params(source) {
    let res = {};
    let path = source ? source : window.location.pathname;
    if (path) {
        let arr = path.split('?');
        if (arr.length > 1) {
            let query = arr[1];
            if (query) {
                let q = query.split('&');
                q.forEach(param => {
                    if (param) {
                        let p = param.split('=');
                        res[p[0]] = p[1];
                    }
                });
            }
        }
    }
    return res;
}

export function contain(source) {
    if (source) {
        let res = clone(source);
        if (!res.container) {
            res.container = {};
        }
        for (let key in source) {
            if (!(source[key] instanceof Object)) {
                res.container[key] = source[key];
                res[key] = undefined;
            }
        }
        return res;
    } else {
        return source;
    }
}
