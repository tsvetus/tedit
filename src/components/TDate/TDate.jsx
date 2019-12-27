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
            value: strDate(props.value, props.format.mask, props.format.empty)
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value || old.format !== this.props.format) {
            let value = null;
            if (this.props.value === this.props.empty) {
                value = this.props.empty;
            } else {
                value = strDate(this.props.value, this.props.format.mask, this.props.format.empty);
            }
            if (this.props.value !== value) {
                this.setState({value: value});
            }
        }
    }

    handleValidate(event) {
        return event.empty || testIsoDate(isoDate(event.value, this.props.format.mask));
    }

    handleChange(event) {
        this.setState({value: event.value});
        if (this.props.onChange) {
            let value = event.value;
            if (value) {
                let format = this.props.format;
                if (format && format.type && format.type.indexOf('nat') >= 0) {
                    value = new Date(isoDate(value, format.mask));
                } else if (format && format.type && format.type.indexOf('iso') >= 0) {
                    value = isoDate(value, format.mask);
                } else if (format && !format.type) {
                    value = isoDate(value, format.mask);
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
                format={this.props.format}
                empty={this.props.empty}
                readOnly={this.props.readOnly}
                required={this.props.required}
                onValidate={this.handleValidate}
                onIcon={this.props.onIcon}
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
    format: PropTypes.object,
    empty: PropTypes.any,
    required: PropTypes.any,
    readOnly: PropTypes.any,
    onChange: PropTypes.func,
    onIcon: PropTypes.func
};

TDate.defaultProps = {
    format: {mask: 'DD.MM.YYYY', empty: '-', full: true, type: 'iso'},
    required: true,
    empty: null
};

export default TDate;
