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
                props.mask.full ? props.mask.full : true,
                props.value
            );
            this.full = this.format.isFull();
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    componentWillUnmount() {
        if (this.format) {
            delete this.format;
        }
    }

    handleChange(event) {
        if (this.props.onChange) {
            if (this.format) {
                let full = this.format.isFull();
                if (full) {
                    this.props.onChange({
                        ...event,
                        full: this.format.isFull(),
                        empty: this.format.isEmpty()
                    });
                } else if (this.full) {
                    this.props.onChange({
                        ...event,
                        value: this.props.empty,
                        full: this.format.isFull(),
                        empty: this.format.isEmpty()
                    });
                }
                this.full = full;
            } else {
                this.props.onChange(event);
            }
        }
    }

    handleValidate(event) {
        if (this.props.onValidate) {
            if (this.format) {
                return this.props.onValidate({
                    ...event,
                    full: this.format.isFull(),
                    empty: this.format.isEmpty()
                });
            } else {
                return this.props.onValidate(event);
            }
        } else {
            return true;
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
                vStyle={this.props.vStyle}
                iStyle={this.props.iStyle}
                value={this.props.value}
                name={this.props.name}
                data={this.props.data}
                wrap={this.props.wrap}
                placeholder={this.props.placeholder}
                timeout={this.props.timeout}
                empty={this.props.empty}
                onClick={this.props.onClick}
                onChange={this.handleChange}
                onValidate={this.handleValidate}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onMask={handleMask} />

        );

    }

}

Mask.propTypes = {
    vStyle: PropTypes.object,
    iStyle: PropTypes.object,
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
    onValidate: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

Mask.defaultProps = {
    empty: null
};

export default Mask;
