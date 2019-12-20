import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge} from '../../util';

import styles from '../../styles';

/**
 * @class TCheck
 * @property {object} style - React style
 * @property {any} value - Current value representing checked/unchecked state
 * @property {string} name - Component name which is returned in onChange event back to parent component,
 * @property {any} data - Any component data which is returned in onChange event back to parent component,
 * @property {string} label - Component caption
 * @property {any} checked=true - Value returned if component is checked
 * @property {any} unchecked=false - Value returned if component is unchecked
 * @property {func} onChange - On change event. Returns object: <i>{value: [checked value], name:
 * [component name], data: [component data]}</i>
 * @extends React.Component
 * @example
 * class Test extends React.Component {
 *     constructor() {
 *         super();
 *         this.state = {value: 1}
 *     }
 *     render() {
 *         return (
 *             <TCheck
 *                 label={'Check me:'}
 *                 value={this.state.value}
 *                 checked={1}
 *                 unchecked={0}
 *                 onChange={(event) => {this.setState({value: event.value});}} />
 *         );
 *     }
 * }
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
            styles.TComponent,
            styles.TCheck,
            styles[this.props.name],
            this.props.style
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
