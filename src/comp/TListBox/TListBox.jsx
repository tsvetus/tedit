import React from 'react';
import PropTypes from 'prop-types';

import TIcon from '../TIcon';

import {Edit, List} from '../../lib';

import {merge} from '../../util';

import styles from '../../styles';

/**
 * List box component.
 * @extends React
 */
class TListBox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            valid: true,
            showList: false
        };
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.getRect = this.getRect.bind(this);
        this.getListStyle = this.getListStyle.bind(this);
        this.ref = React.createRef();
        this.helper = new List.Helper();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        delete this.helper;
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
        this.setState({showList: !this.state.showList});
    }

    handleChange(event) {
        this.handleIcon();
        if (this.props.onChange) {
//            this.props.onChange(event);
        } else {
//            this.validate(event.value);
        }
    }

    getRect() {
        let rect = this.ref.current.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
        }
    }

    getListStyle() {
        let rect = this.getRect();
        return {
            position: "absolute",
            left: rect.left + 'px',
            top: rect.bottom + 'px',
            width: rect.width + 'px'
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
                <div style={style.label} onClick={this.handleIcon} >
                    {this.props.label}
                </div>
            );
        }

        let icon = null;
        if (this.props.showIcon) {
            icon = (
                <TIcon
                    style={style.icon}
                    name={this.state.showList ? 'up' : 'down'}
                    onClick={this.handleIcon} />
            );
        }

        let list = null;
        if (this.state.showList && this.props.items) {
            this.helper.load(this.props.items, this.props.empty, this.props.listMode);
            let listStyle = merge(style, {list: this.getListStyle()});
            list = (
                <List
                    style={listStyle}
                    value={this.props.value}
                    items={this.helper.getItems()}
                    onClick={this.handleChange} />
            );
        }

        return (
            <div style={style.container}>
                <div style={style.frame} ref={this.ref}>
                    {label}
                    <Edit
                        style={style.edit}
                        data={this.props.data}
                        name={this.props.name}
                        value={this.props.value}
                        timeout={this.props.timeout}
                        placeholder={this.props.placeholder}
                        wrap={false}
                        readOnly={true}
                        onClick={this.handleIcon}
                        onChange={this.handleChange} />
                    {icon}
                </div>
                {list}
            </div>
        );

    }

}

TListBox.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    showIcon: PropTypes.any,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    empty: PropTypes.object,
    items: PropTypes.array,
    listMode: PropTypes.string,
    showMode: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func
};

TListBox.defaultProps = {
    showIcon: true
};

export default TListBox;
