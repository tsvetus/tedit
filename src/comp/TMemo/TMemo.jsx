import React from 'react';
import PropTypes from 'prop-types';

import {Edit, Icon} from '../../lib';

import {merge} from '../../util';

import styles from '../../styles';

/**
 * Component representing TMemo.
 * @extends React
 */
class TMemo extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleIcon = this.handleIcon.bind(this);
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

    render () {

        let style = merge(
            styles.TComponent,
            styles.TMemo,
            styles[this.props.name],
            this.props.style
        );

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let icon = null;
        if (this.props.icon) {
            icon = (<Icon style={style.icon} name={this.props.icon} onClick={this.handleIcon} />);
        }

        return (
            <div style={style.container}>
                <div style={style.frame}>
                    {label}
                    {icon}
                </div>
                <Edit
                    vStyle={style.edit}
                    iStyle={style.edit}
                    value={this.props.value}
                    wrap={this.props.wrap}
                    data={this.props.data}
                    name={this.props.name}
                    empty={this.props.empty}
                    placeholder={this.props.placeholder}
                    timeout={this.props.timeout}
                    onChange={this.props.onChange} />
            </div>
        );

    }

}

TMemo.propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    icon: PropTypes.string,
    wrap: PropTypes.any,
    empty: PropTypes.any,
    placeholder: PropTypes.string,
    timeout: PropTypes.number,
    onChange: PropTypes.func,
    onIcon: PropTypes.func
};

export default TMemo;
