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

class Props extends React.Component {

    render () {

        let style = merge(styles, this.props.style);

        let items = [];
        let props = this.props.data ? this.props.data : {};
        for (let key in props) {
            iterate(0, key, props[key], (event) => {
                let sn = merge(style.name, {paddingLeft: event.level*16 + "px"});
                items.push({
                    prop: (<div>{event.name}</div>),
                    type: event.type,
                    def: event.def,
                    description: event.description
                });
            });
        }

        return (
            <TGrid
                columns={{
                    prop: {caption: 'name', width: '120px'},
                    type: {caption: 'type', width: '120px'},
                    def: {caption: 'default', width: '120px'},
                    description: {caption: 'description'}
                }}
                items={items} />
        );

    }

}

Props.propTypes = {
    data: PropTypes.object.isRequired
};

export default Props;