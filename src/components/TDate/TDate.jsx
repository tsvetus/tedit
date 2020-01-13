import React from 'react';
import PropTypes from 'prop-types';

import {Text} from '../../lib';

import {merge, compare, strDate, isoDate, testIsoDate} from '../../util';

import styles from '../../styles';

/**
 * Date editor with masked input and date value validation
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
        if (old.value !== this.props.value || !compare(old.format, this.props.format)) {
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
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component label */
        label: PropTypes.object,
        /** Style for component editor */
        edit: PropTypes.object,
        /** Style for component icon */
        icon: PropTypes.object,
        /** Style for invalid component state. Contains all listed above fields: */
        invalid:  PropTypes.shape({
            container: PropTypes.object,
            label: PropTypes.object,
            edit: PropTypes.object,
            icon: PropTypes.object
        })
    }),
    /** Component initial value. "value" should be native avaScript "Date" object or date in iso format like
     * "YYYY-MM-DD"
     */
    value: PropTypes.any,
    /** Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** Label caption. Default is undefined and label is hidden */
    label: PropTypes.string,
    /** Icon name to show. Default is undefined and icon is hidden */
    icon: PropTypes.string,
    /** Represents timeout for "onChange" event in milliseconds. Default is "700" */
    timeout: PropTypes.number,
    /** Date format: */
    format: PropTypes.shape({
        /** Date mask. Default is "DD.MM.YYYY" */
        mask: PropTypes.string,
        /** Empty char. If length of empty char is grate than 1 then only first character is used. Default is "_" */
        empty: PropTypes.string,
        /** If true then onChange event fires only if date is completely entered or completely cleared.
         * Default is "true"
         */
        full: PropTypes.bool,
        /** Date format appeared in onChange event. Default is "iso" ("YYYY-MM-DD") */
        type: PropTypes.oneOf(['iso', 'native'])
    }),
    /** Value appeared in onChange event then date is not completely entered or invalid. Default is "null" */
    empty: PropTypes.any,
    /** Indicates if necessary to change component color when entered date is invalid or incomplete.
     * Default is "true"
     */
    required: PropTypes.any,
    /** Prevents from changing component value from user input, Default is "false" */
    readOnly: PropTypes.any,
    /**
     * On date change event
     * @param {Object} event Event object with following structure:
     * @param {String} event.name Component name from "name" property
     * @param {Object} event.data Component data from "data" property
     * @param {Any} event.value Component date value. Date value format is determined by "format.type" property.
     */
    onChange: PropTypes.func,
    /**
     * On icon click event
     * @param {Object} event Event object with following structure:
     * @param {String} event.name Component name from "name" property
     * @param {Object} event.data Component data from "data" property
     * @param {String} event.icon Clicked icon name
     */
    onIcon: PropTypes.func
};

TDate.defaultProps = {
    format: {mask: 'DD.MM.YYYY', empty: '-', full: true, type: 'iso'},
    required: true,
    empty: null
};

export default TDate;
