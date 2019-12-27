import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import styles from '../../styles';

/**
 * Button with text caption
 */
class TButton extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data
            });
        }
    }

    render () {

        let style = merge(
            contain(styles.TButton),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let cst = style.container;
        if (this.props.wait) {
            cst = merge(cst, style.wait);
        }

        return (
            <div
                style={cst}
                name={this.props.name}
                onClick={this.handleClick}>
                    {this.props.children}
            </div>
        );

    }

}

TButton.propTypes = {
    /**
     * Inline React style<br/>
     * style structure<br/>
     */
    style: PropTypes.object,
    /** Component name */
    name: PropTypes.string,
    /** Component data */
    data: PropTypes.any,
    /** Component wait state. When <i>true</i> component appears in grey color and doesn't respond
     * on <i>onClick</i> event
     */
    wait: PropTypes.any,
    /**
     * On click event
     * @param {Object} event event object with following structure:<br/>
     * @param {String} event.name component name from <i>name</i> property<br/>
     * @param {Object} event.data component data from <i>data</i> property<br/>
     */
    onClick: PropTypes.func
};

export default TButton;
