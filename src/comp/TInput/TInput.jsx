import React from 'react';
import PropTypes from 'prop-types';

import {Input, Icon} from '../../lib';

import {merge} from '../../util';

import styles from '../../styles';

/**
 * Component representing icons.
 * @extends React
 */
class TInput extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {valid: true};
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    componentDidMount() {
        this.validate(this.props.value)
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.validate(this.props.value)
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
        if (this.props.onChange) {
            this.props.onChange({
                ...event,
                icon: this.props.icon
            })
        } else {
            this.validate(event.value)
        }
    }

    validate(value) {
        if (this.props.onValidate) {
            let valid = this.props.onValidate({
                data: this.props.data,
                name: this.props.name,
                icon: this.props.icon,
                value: value
            });
            if (valid !== this.state.valid) {
                this.setState({valid: valid})
            }
        } else {
            return true
        }
    }

    render () {

        let style = merge(
            styles.component,
            styles.input,
            styles[this.props.name],
            this.props.style
        );

        if (!this.state.valid) {
            style = merge(
                style,
                styles.component ? styles.component.invalid : null,
                styles.input ? styles.input.invalid : null,
                styles[this.props.name] ? styles[this.props.name].invalid : null,
                this.props.style ? this.props.style.invalid : null
            )
        }

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

        return (
            <div style={style.container}>
                <div style={style.frame}>
                    {label}
                    <Input
                        style={style.edit}
                        data={this.props.data}
                        name={this.props.name}
                        value={this.props.value}
                        timeout={this.props.timeout}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange} />
                    {icon}
                </div>
            </div>
        );

    }

}

TInput.propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    icon: PropTypes.string,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onIcon: PropTypes.func,
};

export default TInput;
