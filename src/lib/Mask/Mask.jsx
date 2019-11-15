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
            this.completed = this.format.completed();
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
                let completed = this.format.completed();
                if (completed) {
                    this.props.onChange(event);
                } else if (this.completed) {
                    this.props.onChange({
                        ...event,
                        value: this.props.empty
                    });
                }
                this.completed = completed;
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
                empty={this.props.empty}
                onClick={this.props.onClick}
                onChange={this.handleChange}
                onValidate={this.props.onValidate}
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
    empty: PropTypes.any,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onMask: PropTypes.func,
    onValidate: PropTypes.func
};

Mask.defaultProps = {
    empty: null
};

export default Mask;
