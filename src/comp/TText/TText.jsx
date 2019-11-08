import React from 'react';
import PropTypes from 'prop-types';

import {TIcon} from 'comp';

import {Mask} from 'lib';

import {merge} from 'util';

import styles from 'styles';

/**
 * Component representing icons.
 * @extends React
 */
class TText extends React.Component {

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

        let style = merge(styles.component, styles.ttext, this.props.style);
        if (!this.state.valid) {
            style = merge(
                style,
                styles.component ? styles.component.invalid : null,
                styles.ttext ? styles.ttext.invalid : null,
                this.props.style ? this.props.style.invalid : null
            );
        }

        let label = null;
        if (this.props.label) {
            label = (
                <div style={style.label}>
                    {this.props.label}
                </div>
            );
        }

        let icon = null;
        if (this.props.icon) {
            icon = (
                <TIcon
                    style={style.icon}
                    name={this.props.icon}
                    onClick={this.handleIcon} />
            );
        }

        return (
            <div style={style.container}>
                <div style={style.frame}>
                    {label}
                    <Mask
                        style={style.edit}
                        data={this.props.data}
                        name={this.props.name}
                        value={this.props.value}
                        timeout={this.props.timeout}
                        strip={this.props.strip}
                        mask={this.props.mask}
                        onMask={this.props.onMask}
                        onChange={this.handleChange} />
                    {icon}
                </div>
            </div>
        );

    }

}

TText.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    icon: PropTypes.string,
    strip: PropTypes.any,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    mask: PropTypes.string,
    empty: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onIcon: PropTypes.func,
    onMask: PropTypes.func
};

export default TText;
