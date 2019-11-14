import React from 'react';
import PropTypes from 'prop-types';

import {Mask, Icon} from '../../lib';

import {merge} from '../../util';

import styles from '../../styles';

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
            styles.TComponent,
            styles.TText,
            styles[this.props.name],
            this.props.style
        );

        if (!this.state.valid) {
            style = merge(
                style,
                styles.component ? styles.component.invalid : null,
                styles.text ? styles.text.invalid : null,
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
                        onChange={this.handleChange} />
                    {icon}
                </div>
            </div>
        );

    }

}

TText.propTypes = {
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

export default TText;
