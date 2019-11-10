import React from 'react';
import PropTypes from 'prop-types';

import Helper from './helper.js';

import {merge} from '../../util';

import styles from '../../styles';

/**
 * @class
 * @ignore
 */
class List extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if (this.props.onClick) {
            let index = event.target.getAttribute('index');
            this.props.onClick(this.props.items[index]);
        }
    }

    render () {

        let style = merge(styles.component, this.props.style);

        let items = this.props.items.map((v, i) => {
            let ist = merge(style.item, v.key == this.props.selected ? style.selected : {});
            return (
                <div key={i} index={i} style={ist} onClick={this.handleClick}>
                    {v.value}
                </div>
            );
        });

        return (

            <div style={style.list}>
                {items}
            </div>

        );

    }

}

List.propTypes = {
    style: PropTypes.object,
    items: PropTypes.array,
    selected: PropTypes.any,
    onClick: PropTypes.func
};

List.Helper = Helper;

export default List;
