import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

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
     * Component style
     * @property {Object} style Style structure:
     * @property {String} style.container React inline style for component container
     */
    style: PropTypes.object,
    value: PropTypes.any,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    checked: PropTypes.any,
    unchecked: PropTypes.any,
    onChange: PropTypes.func
};

TCheck.defaultProps = {
    checked: true,
    unchecked: false
};

export default TCheck;

