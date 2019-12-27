import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

/**
 * TCheck component
 */
class TCheck extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {checked: false};
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateChecked = this.updateChecked.bind(this);
    }

    componentDidMount() {
        this.updateChecked(this.props.value, false);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.updateChecked(this.props.value, false);
        }
    }

    handleIcon() {
        this.updateChecked(!this.state.checked, true);
    }

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    updateChecked(value, change) {
        let checked = value || value === this.props.checked;
        this.setState({checked: checked}, () => {
            if (change && this.props.onChange) {
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    value: checked ? this.props.checked : this.props.unchecked
                });
            }
        });
    }

    render () {

        let style = merge(
            contain(styles.TComponent),
            contain(styles.TCheck),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let label = null;
        if (this.props.label) {
            label =
                <div style={style.label}>
                    {this.props.label}
                </div>
        }

        let icon =
            <Icon
                style={style.icon}
                name={this.state.checked ? 'checked' : 'unchecked'}
                onClick={this.handleIcon} />;

        return (
            <div style={style.container}>
                <div style={style.frame} onClick={this.handleIcon} >
                    {label}
                    {icon}
                </div>
            </div>
        );

    }

}

TCheck.propTypes = {
    /**
     * Component style.
     *
     * Style structure: {container: {...}, label: {...}, icon: {...}}
     */
    style: PropTypes.object,
    /** Component value. If equals to <i>true</i> or <i>props.checked</i> component is checked.
     * Otherwise it is unchecked */
    value: PropTypes.any,
    /** Component name */
    name: PropTypes.string,
    /** Component data */
    data: PropTypes.any,
    /** Component label caption */
    label: PropTypes.string,
    /** Checked state value */
    checked: PropTypes.any,
    /** Unchecked state value */
    unchecked: PropTypes.any,
    /**
     * On click event
     * @param {Object} event event object with following structure:<br/>
     * @param {String} event.name component name from <i>name</i> property<br/>
     * @param {Object} event.data component data from <i>data</i> property<br/>
     * @param {Object} event.value component value. If component state is checked then <i>value</i> equals to
     * <i>checked</i> property. Otherwise it equals to <i>unchecked</i> property<br/>
     */
    onChange: PropTypes.func
};

TCheck.defaultProps = {
    checked: true,
    unchecked: false
};

export default TCheck;

