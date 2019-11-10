import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Edit from '../Edit';
import List from '../List';

import {merge} from '../../util';

import styles from '../../styles';

class ListBox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            valid: true,
            showList: false,
            showText: ''
        };
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.validate = this.validate.bind(this);
        this.getRect = this.getRect.bind(this);
        this.getListStyle = this.getListStyle.bind(this);
        this.updateText = this.updateText.bind(this);
        this.ref = React.createRef();
        this.helper = new List.Helper();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        delete this.helper;
    }

    componentDidMount() {
        this.validate(this.props.value);
        this.updateText(this.props.value);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.validate(this.props.value);
            this.updateText(this.props.value);
        }
    }

    handleIcon() {
        if (this.helper.hasItems()) {
            this.setState({showList: !this.state.showList});
        }
    }

    handleChange(event) {
        this.handleIcon();
        if (this.props.onChange && this.props.value != event.key) {
            this.updateText(event.key);
            this.props.onChange({
                name: this.props.name,
                data: this.props.data,
                value: event.key
            });
        } else {
            this.validate(event.key);
            this.updateText(event.key);
        }
    }

    handleTextChange(event) {
        if (this.props.onSearch) {
            this.setState({showText: event.value}, () => {
                let items = this.props.onSearch({value: event.value});
                if (items) {
                    this.handleIcon();
                }
            });
        }
    }

    updateText(value) {
        this.helper.load(this.props.items, this.props.empty, this.props.showMode);
        let item = this.helper.getItem(value);
        if (item) {
            if (item.index === -1 && this.props.placeholder) {
                this.setState({showText: ''});
            } else {
                this.setState({showText: item.value});
            }
        } else {
            this.setState({showText: ''});
        }
    }

    getRect() {
        let rect = this.ref.current.getBoundingClientRect();
        return {
            left: rect.left + document.scrollLeft,
            top: rect.top + document.scrollTop,
            right: rect.right + document.scrollLeft,
            bottom: rect.bottom + document.scrollTop,
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
            )
        }

        let label = null;
        if (this.props.label) {
            let click = this.props.clickable ? this.handleIcon : null;
            label =
                <div style={style.label} onClick={click} >
                    {this.props.label}
                </div>
        }

        let icon = null;
        if (this.props.showIcon) {
            icon =
                <Icon
                    style={style.icon}
                    name={this.state.showList ? 'up' : 'down'}
                    onClick={this.handleIcon} />
        }

        let list = null;
        if (this.state.showList && this.props.items) {
            this.helper.load(this.props.items, this.props.empty, this.props.listMode);
            let listStyle = merge(style, {list: this.getListStyle()});
            list =
                <List
                    style={listStyle}
                    selected={this.props.value}
                    items={this.helper.getItems()}
                    onClick={this.handleChange} />
        }

        let click = this.props.clickable ? this.handleIcon : null;

        return (
            <div style={style.container}>
                <div style={style.frame} ref={this.ref}>
                    {label}
                    <Edit
                        style={style.edit}
                        data={this.props.data}
                        name={this.props.name}
                        value={this.state.showText}
                        timeout={this.props.timeout}
                        placeholder={this.props.placeholder}
                        wrap={false}
                        readOnly={!this.props.editable}
                        onClick={click}
                        onChange={this.handleTextChange} />
                    {icon}
                </div>
                {list}
            </div>
        );

    }

}

ListBox.propTypes = {
    style: PropTypes.object,
    value: PropTypes.any,
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
    editable: PropTypes.any,
    clickable: PropTypes.any,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    onValidate: PropTypes.func
};

ListBox.defaultProps = {
    showIcon: true,
    editable: false,
    clickable: true
};

export default ListBox;
