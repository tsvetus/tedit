import React from 'react';
import PropTypes from 'prop-types';

import {
    TGroup,
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

class Props extends React.Component {

    render () {

        let style = merge(styles, this.props.style);

        let items = [];
        let props = this.props.data ? this.props.data : {};
        for (let key in props) {
            iterate(null, key, props[key], (event) => {
                let desc = [];
                if (event.type === 'shape') {
                    iterate(0, key, props[key], (event) => {
                        if (event.level === 0) {
                            desc.push(
                                <div  key={-1} style={style.description}>{event.description}</div>
                            );
                        } else {
                            let sn = merge(style.name, {paddingLeft: + event.level*16 + "px"});
                            desc.push(
                                <div key={event.name + '_' + event.level} style={style.row}>
                                    <div style={sn}>{event.name}</div>
                                    <div style={style.description}>{event.description}</div>
                                </div>
                            );
                        }
                    });
                } else {
                    desc = [<div key={-1} style={style.description}>{event.description}</div>];
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
                    scroll: false
                }} />
        );

    }

}

Props.propTypes = {
    data: PropTypes.object.isRequired
};

export default Props;