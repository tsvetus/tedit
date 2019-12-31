import React from 'react';
import PropTypes from 'prop-types';

import icons from './icons.js';

import styles from '../../styles';
import {contain, merge} from "../../util";

class Icon extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.stopPropagation();
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data
            });
        }
    }

    render () {

        let icon = icons[this.props.name];

        let style = merge(
            contain(styles.TIcon),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let content = null;
        let w = "0 0 384 384";
        if (icon) {
            let pathStyle = {
                ...icon.s
            };
            if (style.container.color) {
                pathStyle.fill = style.container.color;
            }
            content = (<path style={pathStyle} d={icon.d}></path>);
            w = icon.w;
        }

        return (
            <svg style={style.container} viewBox={w}
                onClick={this.handleClick}>
                {content}
            </svg>
        );

    }

}

Icon.icons = icons;

Icon.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
    data: PropTypes.any,
    onClick: PropTypes.func
};

export default Icon;
