import React from 'react';
import PropTypes from 'prop-types';

import Edit from '../Edit';

import {Format} from '../../util';

/**
 * @class
 * @ignore
 */
class Mask extends React.Component {

    constructor(props, context) {
        super(props, context);
        if (props.mask && !props.onMask) {
            this.format = new Format(
                props.mask.mask,
                props.mask.empty,
                props.mask.complete,
                props.value
            );
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillUnmount() {
        if (this.format) {
            delete this.format;
        }
    }

    handleChange(event) {
        if (this.props.onChange) {
            if (this.format) {
                if (this.format.completed()) {
                    this.props.onChange(event);
                }
            } else {
                this.props.onChange(event);
            }
        }
    }

    render () {

        let handleMask = null;
        if (this.props.onMask) {
            handleMask = this.props.onMask;
        } else if (this.format) {
            handleMask = this.format.parse;
        }

        return (

            <Edit
                style={this.props.style}
                value={this.props.value}
                name={this.props.name}
                data={this.props.data}
                wrap={this.props.wrap}
                placeholder={this.props.placeholder}
                timeout={this.props.timeout}
                onClick={this.props.onClick}
                onChange={this.handleChange}
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
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    mask: PropTypes.object,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onMask: PropTypes.func
};

export default Mask;
