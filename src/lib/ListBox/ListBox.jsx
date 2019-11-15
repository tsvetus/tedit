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
            showText: '',
            hover: -1
        };
        this.handleIcon = this.handleIcon.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validate = this.validate.bind(this);
        this.getFrameRect = this.getFrameRect.bind(this);
        this.getListStyle = this.getListStyle.bind(this);
        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.updateText = this.updateText.bind(this);
        this.moveHover = this.moveHover.bind(this);
        this.frame = React.createRef();
        this.container = React.createRef();
        this.list = React.createRef();
        this.helper = new List.Helper();
        this.containerHeight = 'auto';
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

    moveHover(dir) {
        if (this.state.showList) {
            if (dir === -1 && this.state.hover > 0) {
                this.setState({hover: this.state.hover - 1});
            } else if (dir === 1 && this.state.hover < this.helper.getLength() - 1) {
                this.setState({hover: this.state.hover + 1});
            }
        }
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 40:
                this.handleShow(true);
                this.moveHover(1);
                break;
            case 38:
                this.moveHover(-1);
                break;
            case 9:
            case 27:
                this.handleShow(false);
                break;
            case 13:
                if (this.state.showList) {
                    this.list.current.handleUse(this.state.hover);
                } else {
                    this.handleShow(true);
                }
                break;
        }
    }

    handleShow(show) {
        if (show && !this.state.showList && this.helper.hasItems()) {
            this.setState({showList: true, hover: -1});
        } else if (!show && this.state.showList) {
            this.setState({showList: false, hover: -1});
        }
    }

    handleIcon() {
        this.handleShow(!this.state.showList);
    }

    handleChange(event) {
        this.handleShow(false);
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
                    this.handleShow(true);
                }
            });
        }
    }

    handleBlur() {
        this.handleShow(false);
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

    getFrameRect(element) {
        let rect = element.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
        }
    }

    getListStyle() {
        let rect = this.getFrameRect(this.frame.current);
        return {
            left: rect.left + 'px',
            top: rect.bottom + 'px',
            width: rect.width + 'px'
        }
    }

    getContainerStyle() {
        if (this.state.showList) {
            this.containerHeight = this.container.current.style.height ?
                this.container.current.style.height : 'auto';
            let rect = this.getFrameRect(this.container.current);
            return {
                height: rect.height + 'px'
            }
        } else {
            return {
                height: this.containerHeight
            }
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

        let style = merge(styles.TComponent, styles.TText, this.props.style);

        if (!this.state.valid) {
            style = merge(
                style,
                styles.TComponent ? styles.TComponent.invalid : null,
                styles.TText ? styles.TText.invalid : null,
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
            let listStyle = merge(style.list, {container: this.getListStyle()});
            list =
                <List
                    ref={this.list}
                    style={listStyle}
                    selected={this.props.value}
                    hover={this.state.hover}
                    items={this.helper.getItems()}
                    onClick={this.handleChange} />
        }

        let containerStyle = merge(style.container, this.getContainerStyle());

        let click = this.props.clickable ? this.handleIcon : null;

        return (
            <div style={containerStyle} ref={this.container}>
                <div style={style.frame} ref={this.frame}>
                    {label}
                    <Edit
                        vStyle={style.edit}
                        iStyle={style.edit}
                        data={this.props.data}
                        name={this.props.name}
                        value={this.state.showText}
                        timeout={this.props.timeout}
                        placeholder={this.props.placeholder}
                        wrap={false}
                        readOnly={!this.props.editable}
                        onClick={click}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.handleBlur}
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
