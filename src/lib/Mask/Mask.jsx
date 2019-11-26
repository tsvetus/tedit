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
        }
        this.handleValidate = this.handleValidate.bind(this);
    }

    componentWillUnmount() {
        if (this.format) {
            delete this.format;
        }
    }

    handleValidate(event) {
        if (this.props.onValidate) {
            if (this.format) {
                return this.props.onValidate({
                    ...event,
                    empty: this.format.isEmpty(),
                    full: this.format.isFull()
                });
            } else {
                return this.props.onValidate({
                    ...event,
                    empty: false,
                    full: true
                });
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

        let handleValidate = this.props.onValidate ? this.props.onValidate : null;

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
                readOnly={this.props.readOnly}
                onClick={this.props.onClick}
                onChange={this.props.onChange}
                onValidate={handleValidate}
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
    readOnly: PropTypes.any,
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
