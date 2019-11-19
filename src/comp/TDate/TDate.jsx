import React from 'react';
import PropTypes from 'prop-types';

import {Text} from '../../lib';

import {merge, strDate, isoDate, testIsoDate} from '../../util';

import styles from '../../styles';

/**
 * Component representing icons.
 * @extends React
 */
class TDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: strDate(props.mask.mask, props.mask.empty, props.value)
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value || old.mask !== this.props.mask) {
            let value = null;
            if (this.props.value === this.props.empty) {
                value = this.props.empty;
            } else {
                value = strDate(this.props.mask.mask, this.props.mask.empty, this.props.value);
            }
            if (this.props.value !== value) {
                this.setState({value: value});
            }
        }
    }

    handleValidate(event) {
        return event.empty || testIsoDate(isoDate(this.props.mask.mask, event.value));
    }

    handleChange(event) {
        this.setState({value: event.value});
        if (this.props.onChange) {
            let value = event.value;
            if (value) {
                let mask = this.props.mask;
                let format = this.props.format;
                if (format && format.indexOf('nat') >= 0) {
                    value = new Date(isoDate(mask.mask, value));
                } else if (format && format.indexOf('iso') >= 0) {
                    value = isoDate(mask.mask, value);
                }
            }
            this.props.onChange({
                ...event,
                value: value
            });
        }
    }

    render () {

        let style = merge(
            styles.TComponent,
            styles.TDate,
            styles[this.props.name],
            this.props.style
        );

        return (
            <Text
                style={style}
                data={this.props.data}
                name={this.props.name}
                value={this.state.value}
                label={this.props.label}
                icon={this.props.icon}
                timeout={this.props.timeout}
                placeholder={this.props.placeholder}
                mask={this.props.mask}
                regexp={this.props.regexp}
                empty={this.props.empty}
                showInvalid={this.props.showInvalid}
                onValidate={this.handleValidate}
                onIcon={this.props.onIcon}
                onMask={this.props.onMask}
                onChange={this.handleChange} />
        );

    }

}

TDate.propTypes = {
    style: PropTypes.object,
    value: PropTypes.any,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    icon: PropTypes.string,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    mask: PropTypes.object,
    empty: PropTypes.any,
    format: PropTypes.string,
    showInvalid: PropTypes.any,
    onChange: PropTypes.func,
    onIcon: PropTypes.func
};

TDate.defaultProps = {
    mask: {mask: 'DD.MM.YYYY', empty: '-', complete: true},
    format: 'iso',
    empty: null
};

export default TDate;
