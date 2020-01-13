import React from 'react';
import PropTypes from 'prop-types';

import {
    TGrid,
    merge
} from 'tedit';

import styles from "./styles.js";

function iterate(level, name, data, callback) {

    if (name && data) {

        let required = data.required;
        let description = data.description;
        let defaultValue = data.defaultValue && data.defaultValue.value ? JSON.stringify(data.defaultValue.value) : '';
        defaultValue = defaultValue
            .replace(/"/g, '')
            .replace(/:/g, ': ')
            .replace(/,/g, ', ');

        let typeName = data.type ? data.type.name : (data.name ? data.name : null);

        callback({
            name: name,
            type: typeName,
            description: description,
            required: required,
            def: defaultValue,
            level: level
        });

        if (level !== null && level !== undefined && typeName === 'shape') {
            if (data.type && data.type.value) {
                for (let key in data.type.value) {
                    iterate(level + 1, key, data.type.value[key], callback);
                }
            } else if (data.value) {
                for (let key in data.value) {
                    iterate(level + 1, key, data.value[key], callback);
                }
            }
        }

    }

}

function parseDescription(description, style) {
    if (description && description.indexOf('@param') >= 0) {
        let desc = description.replace(/\r/gm, '').replace(/\n/gm, ' ');
        let lines = desc.split('@param');
        let items = [];
        let params = [];
        lines.forEach((v, i) => {
            if (i === 0) {
                items.push(<div key={i}>{v}</div>);
            } else {
                let w = v.trim().replace(/\r/gm, '').replace(/\n/gm, ' ');
                let words = w.split(' ');
                let type = words.shift();
                let name = words.shift();
                let text = words.join(' ');
                params.push({name: name, type: type, text: text});
            }
        });
        if (params.length > 0) {
            items.push(
                <div key={1}>
                    <TGrid
                        key={1}
                        // style={style.subGrid}
                        columns={{
                            name: {caption: 'name', width: '100px'},
                            type: {caption: 'type', width: '100px'},
                            text: {caption: 'description'}
                        }}
                        items={params}
                        options={{
                            select: false,
                            scroll: false,
                            borderWidth: 0,
                            showHead: false
                        }} />
                </div>
            );
        }
        return <div>{items}</div>;
    } else {
        return description;
    }
}

class Props extends React.Component {

    render () {

        let style = merge(styles, this.props.style);

        let items = [];
        let props = this.props.data ? this.props.data : {};
        for (let key in props) {
            iterate(null, key, props[key], (event) => {
                let desc = [];
                let subItems = [];
                if (event.type === 'shape') {
                    iterate(0, key, props[key], (event) => {
                        if (event.level === 0) {
                            desc.push(
                                <div  key={-1} style={style.description}>{parseDescription(event.description)}</div>
                            );
                        } else {
                            let sn = merge(style.name, {paddingLeft: + (event.level - 1)*16 + "px"});
                            subItems.push({
                                subName: <div style={sn}>{event.name}</div>,
                                subDesc: <div style={style.description}>{parseDescription(event.description)}</div>
                            });
                        }
                    });
                    if (subItems.length > 0 ) {
                        desc.push(
                            <TGrid
                                key={1}
                                style={style.subGrid}
                                columns={{
                                    subName: {caption: 'name', width: '120px'},
                                    subDesc: {caption: 'description'}
                                }}
                                items={subItems}
                                options={{
                                    select: false,
                                    scroll: false,
                                    borderWidth: 0,
                                    showHead: false
                                }} />
                        );
                    }
                } else {
                    desc = [<div key={-1} style={style.description}>{parseDescription(event.description)}</div>];
                }
                items.push({
                    prop: <div style={style.name}>{event.name}</div>,
                    type: <div style={style.type}>{event.type}</div>,
                    def: <div style={style.def}>{event.def}</div>,
                    required: <div style={style.required}>{event.required ? '*' : ''}</div>,
                    description: <div>{desc}</div>
                });
            });
        }

        return (
            <TGrid
                style={style.grid}
                columns={{
                    prop: {caption: 'name', width: '80px'},
                    type: {caption: 'type', width: '80px'},
                    def: {caption: 'default', width: '120px'},
                    required: {caption: 'req', width: '40px'},
                    description: {caption: 'description'}
                }}
                items={items}
                options={{
                    select: false,
                    scroll: false,
                    borderWidth: 0
                }} />
        );

    }

}

Props.propTypes = {
    data: PropTypes.object.isRequired
};

export default Props;