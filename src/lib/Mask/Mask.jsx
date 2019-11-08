import React from 'react';
import PropTypes from 'prop-types';

import {Edit, Format} from 'lib';

/**
 * Mask edit component.
 * @extends React
 */
class Mask extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.format = new Format(this.props.mask, this.props.empty, this.props.value);
        this.handleMask = this.handleMask.bind(this);
    }

    componentWillUnmount() {
        delete this.format;
    }

    handleMask(event) {
        if (this.props.onMask) {
            return this.props.onMask(event);
        } else {
            return this.format.parse(event);
        }
    }

    render () {

        let handleMask = null;
        if (this.props.onMask) {
            handleMask = this.props.onMask;
        } else if (this.props.mask) {
            handleMask = this.handleMask;
        }

        return (

            <Edit
                style={this.props.style}
                value={this.props.value}
                name={this.props.name}
                data={this.props.data}
                wrap={this.props.wrap}
                strip={this.props.strip}
                placeholder={this.props.placeholder}
                timeout={this.props.timeout}
                onClick={this.props.onClick}
                onChange={this.props.onChange}
                onMask={handleMask} />

        );

    }

}

Mask.propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    wrap: PropTypes.any,
    strip: PropTypes.any,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    empty: PropTypes.string,
    mask: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onMask: PropTypes.func
};

Mask.defaultProps = {
    empty: '-'
};

export default Mask;
