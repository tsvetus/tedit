import React from 'react';
import PropTypes from 'prop-types';

import {merge} from '../../util';

import styles from '../../styles';

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

        let style = merge(styles.button, this.props.style);

        if (this.props.wait) {
            style = {
                ...style,
                color: "#ddd"
            }
        }

        return (
            <div
                style={style}
                name={this.props.name}
                onClick={this.handleClick}>
                    {this.props.children}
            </div>
        );

    }

}

TButton.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    wait: PropTypes.any,
    onClick: PropTypes.func
};

export default TButton;
