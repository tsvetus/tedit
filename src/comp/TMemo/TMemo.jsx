import React from 'react';
import PropTypes from 'prop-types';

import {TIcon} from 'comp';

import {TIMEOUT, Edit} from 'lib';

import {merge} from 'util';

import styles from 'styles';

/**
 * Component representing TMemo.
 * @extends React
 */
class TMemo extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {valid: true};
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    componentDidMount() {
        this.validate(this.props.value);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.validate(this.props.value);
        }
    }

    handleIcon() {
        if (this.props.onIcon) {
            this.props.onIcon({
                data: this.props.data,
                name: this.props.name,
                icon: this.props.icon
            });
        }
    }

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        } else {
            this.validate(event.value);
        }
    }

    validate(value) {
        if (this.props.onValidate) {
            let valid = this.props.onValidate(value);
            if (valid !== this.state.valid) {
                this.setState({valid: valid});
            }
        } else {
            return true;
        }
    }

    render () {

        let style = merge(styles.component, styles.tmemo, this.props.style);

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let icon = null;
        if (this.props.icon) {
            icon = (<TIcon style={style.icon} name={this.props.icon} onClick={this.handleIcon} />);
        }

        return (
            <div style={style.container}>
                <div style={style.frame}>
                    {label}
                    {icon}
                </div>
                <Edit
                    style={style.edit}
                    value={this.props.value}
                    wrap={true}
                    data={this.props.data}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    timeout={this.props.timeout}
                    strip={this.props.strip}
                    onChange={this.handleChange} />
            </div>
        );

    }

}

TMemo.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    icon: PropTypes.string,
    strip: PropTypes.any,
    placeholder: PropTypes.string,
    timeout: PropTypes.number,
    onChange: PropTypes.func,
    onIcon: PropTypes.func
};

Edit.defaultProps = {
    timeout: TIMEOUT
};

export default TMemo;