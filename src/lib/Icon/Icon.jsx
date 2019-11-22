import React from 'react';
import PropTypes from 'prop-types';

import layout from './layout.js';

import icons from './icons.js';

import styles from '../../styles';

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

        let svgStyle = {
            ...layout.svg,
            ...styles.TIcon,
            ...this.props.style
        };

        let content = null;
        let w = "0 0 384 384";
        if (icon) {
            let pathStyle = {
                ...icon.s
            };
            if (svgStyle.color) {
                pathStyle.fill = svgStyle.color;
            }
            content = (<path style={pathStyle} d={icon.d}></path>);
            w = icon.w;
        }

        return (
            <svg style={svgStyle} viewBox={w}
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
