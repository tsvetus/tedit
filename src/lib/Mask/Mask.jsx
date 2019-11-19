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
    }

    componentWillUnmount() {
        if (this.format) {
            delete this.format;
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
                onChange={this.props.onChange}
                onValidate={this.props.onValidate}
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
