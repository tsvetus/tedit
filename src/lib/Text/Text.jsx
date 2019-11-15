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
        this.frame = React.createRef();
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.validate = this.validate.bind(this);
        this.valid = true;
        this.validStyle = props.style;
        this.invalidStyle = merge(props.style, props.style.invalid);
    }

    handleValidate(event) {
        return this.validate(event.value);
    }

    componentDidMount() {
        this.mounted = true;
        this.validate();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.validate();
        }
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

    validate(value) {
        let valid = true;
        if (this.mounted && this.props.onValidate) {
            valid = this.props.onValidate({
                data: this.props.data,
                name: this.props.name,
                icon: this.props.icon,
                value: value
            });
            if (valid !== this.valid) {
                if (valid) {
                    apply(this.frame.current.style, this.invalidStyle.frame, this.validStyle.frame);
                } else {
                    apply(this.frame.current.style, this.validStyle.frame, this.invalidStyle.frame);
                }
                this.valid = valid;
            }
        }
        return this.valid;
    }

    render () {

        let style = this.props.style;

        let label = null;
        if (this.props.label) {
            label = (
                <div style={style.label}>
                    {this.props.label}
                </div>
            )
        }

        let icon = null;
        if (this.props.icon) {
            icon = (
                <Icon
                    style={style.icon}
                    name={this.props.icon}
                    onClick={this.handleIcon} />
            )
        }

        let validate = this.props.onValidate ? this.handleValidate : null;

        return (
            <div style={style.container}>
                <div style={style.frame} ref={this.frame}>
                    {label}
                    <Mask
                        style={style.edit}
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
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onIcon: PropTypes.func,
    onMask: PropTypes.func
};

export default Text;
