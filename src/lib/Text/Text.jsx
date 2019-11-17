import React from 'react';
import PropTypes from 'prop-types';

import {Mask, Icon} from '../../lib';

import {merge, apply} from '../../util';

/**
 * Component representing icons.
 * @extends React
 */
class Text extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.validate = this.validate.bind(this);
        this.updateStyle = this.updateStyle.bind(this);
        this.container = React.createRef();
        this.frame = React.createRef();
        this.label = React.createRef();
        this.valid = true;
        this.updateStyle(this.valid, props.style);
    }

    componentDidMount() {
        this.mounted = true;
        this.updateStyle(this.valid, this.props.style);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(old) {
        if (old.style !== this.props.style) {
            this.updateStyle(this.valid, this.props.style);
        }
    }

    handleValidate(event) {
        return this.validate(event.value);
    }

    handleIcon() {
        if (this.props.onIcon) {
            this.props.onIcon({
                data: this.props.data,
                name: this.props.name,
                icon: this.props.icon,
                value: this.props.value
            });
        }
    }

    handleChange(event) {
        if (this.mounted && this.props.onChange) {
            this.props.onChange({
                ...event,
                icon: this.props.icon
            })
        }
    }

    updateStyle(valid, style) {
        if (style) {
            this.vStyle = style;
            this.iStyle = merge(style, style.invalid);
        }
        if (this.mounted) {
            if (valid) {
                apply(this.iStyle.container,  this.vStyle.container,  this.container.current.style);
                apply(this.iStyle.frame,  this.vStyle.frame,  this.frame.current.style);
                apply(this.iStyle.label,  this.vStyle.label,  this.label.current.style);
            } else {
                apply(this.vStyle.container,  this.iStyle.container,  this.container.current.style);
                apply(this.vStyle.frame,  this.iStyle.frame,  this.frame.current.style);
                apply(this.vStyle.label,  this.iStyle.label,  this.label.current.style);
            }
        }
    }

    validate(value) {

        let valid = true;

        if (this.props.onValidate) {
            valid = this.props.onValidate({
                data: this.props.data,
                name: this.props.name,
                icon: this.props.icon,
                value: value
            });
            if (valid !== this.valid) {
                this.updateStyle(valid);
                this.valid = valid;
            }
        } else {
            this.valid = valid;
        }

        if (valid && this.props.regexp) {
            valid = this.props.regexp.test(value);
            if (valid !== this.valid) {
                this.updateStyle(valid);
                this.valid = valid;
            }
        } else {
            this.valid = valid;
        }

        return this.valid;

    }

    render () {

        let label = null;
        if (this.props.label) {
            label = (
                <div
                    ref={this.label}
                    style={this.vStyle.label}>
                    {this.props.label}
                </div>
            )
        }

        let icon = null;
        if (this.props.icon) {
            icon = (
                <Icon
                    style={this.vStyle.icon}
                    name={this.props.icon}
                    onClick={this.handleIcon} />
            )
        }

        let validate = this.props.onValidate || this.props.regexp ? this.handleValidate : null;

        return (
            <div ref={this.container} style={this.vStyle.container}>
                <div style={this.vStyle.frame} ref={this.frame}>
                    {label}
                    <Mask
                        vStyle={this.vStyle.edit}
                        iStyle={this.iStyle.edit}
                        data={this.props.data}
                        name={this.props.name}
                        value={this.props.value}
                        timeout={this.props.timeout}
                        placeholder={this.props.placeholder}
                        wrap={false}
                        mask={this.props.mask}
                        empty={this.props.empty}
                        onMask={this.props.onMask}
                        onValidate={validate}
                        onChange={this.handleChange} />
                    {icon}
                </div>
            </div>
        );

    }

}

Text.propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    icon: PropTypes.string,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    mask: PropTypes.object,
    empty: PropTypes.any,
    regexp: PropTypes.object,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onIcon: PropTypes.func,
    onMask: PropTypes.func
};

export default Text;
