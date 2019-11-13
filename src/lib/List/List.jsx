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
        this.ref = React.createRef();
    }

    handleClick(event) {
        if (this.props.onClick) {
            let index = event.target.getAttribute('index');
            this.props.onClick(this.props.items[index]);
        }
    }

    render () {

        let style = merge(styles.component.list, this.props.style);

        let items = this.props.items.map((v, i) => {
            let ist = style.item;
            if (v.key == this.props.selected) {
                ist = merge(ist, style.selected);
            }
            if (i == this.props.hover) {
                ist = merge(ist, style.hover);
            }
            return (
                <div key={i} index={i} style={ist} onClick={this.handleClick}>
                    {v.value}
                </div>
            );
        });

        return (

            <div style={style.container}>
                {items}
            </div>

        );

    }

}

List.propTypes = {
    style: PropTypes.object,
    items: PropTypes.array,
    selected: PropTypes.any,
    hover: PropTypes.number,
    onClick: PropTypes.func
};

List.Helper = Helper;

export default List;
