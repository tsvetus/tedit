import React from 'react';
import PropTypes from 'prop-types';

import {merge} from 'tedit';

import styles from "./styles.js";

function iterate(level, name, data, callback) {

    if (name && data) {

        let required = data.required;
        let description = data.description;
        let defaultValue = data.defaultValue ? JSON.stringify(data.defaultValue) : '';
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

        if (typeName === 'shape') {
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

class Prop extends React.Component {

    render () {

        let style = merge(styles, this.props.style);

        let content = [];
        iterate(0, this.props.name, this.props.data, (event) => {
            let sn = merge(style.name, {paddingLeft: event.level*16 + "px"});
            content.push(
                <div key={event.name + '_' + event.level} style={style.row}>
                    <div style={sn}>{event.name}</div>
                    <div style={style.type}>{event.type}</div>
                    <div style={style.description}>{event.description}</div>
                    <div style={style.required}>{event.required}</div>
                    <div style={style.def}>{event.def}</div>
                </div>
            );
        });

        return (
            <div style={style.container}>
                {content}
            </div>
        );

    }

}

Prop.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
};

export default Prop;