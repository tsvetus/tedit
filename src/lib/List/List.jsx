import React from 'react';
import PropTypes from 'prop-types';

import Helper from './helper.js';

import {merge} from '../../util';

import styles from '../../styles';

/**
 * List edit component.
 * @extends React
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
            return (
                <div key={i} index={i} style={style.item} onClick={this.handleClick}>
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
    onClick: PropTypes.func
};

List.Helper = Helper;

export default List;
