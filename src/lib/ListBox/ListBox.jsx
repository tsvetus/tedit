import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Edit from '../Edit';
import List from '../List';

import {merge, find} from '../../util';

import styles from '../../styles';

class ListBox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            valid: true,
            showList: false,
            showText: '',
            value: null,
            hover: -1
        };
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleLabelClick = this.handleLabelClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.updateText = this.updateText.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.moveHover = this.moveHover.bind(this);
        this.container = React.createRef();
        this.frame = React.createRef();
        this.list = React.createRef();
        this.edit = React.createRef();
        this.helper = new List.Helper();
        this.containerHeight = 'auto';
    }

    componentWillUnmount() {
        delete this.helper;
    }

    componentDidMount() {
        this.updateItems();
        this.updateText(this.props.value);
    }

    componentDidUpdate(old) {
        if (old.items !== this.props.items || old.listMode !== this.props.listMode ||
            old.showMode !== this.props.showMode) {
            this.updateItems();
        }
        if (old.value !== this.props.value) {
            this.updateText(this.props.value);
        }
    }

    updateItems() {
        this.helper.load(this.props.items, this.props.empty, this.props.listMode, this.props.showMode);
    }

    moveHover(dir) {
        if (this.state.showList) {
            if (dir === -1 && this.state.hover > 0) {
                this.setState({hover: this.state.hover - 1});
            } else if (dir === 1 && this.state.hover < this.helper.getLength() - 1) {
                console.log(this.state.hover);
                this.setState({hover: this.state.hover + 1});
            }
        }
    }

    handleKeyDown(event) {
        console.log(event.keyCode);
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
        if (show !== this.state.showList) {
            this.setState({
                showList: show && this.helper.hasItems(),
                hover: -1
            });
        }
    }

    handleIconClick() {
        this.handleShow(!this.state.showList);
    }

    handleLabelClick() {
        if (this.props.clickable.indexOf('label') >= 0) {
            this.handleShow(!this.state.showList);
        } else {
            this.handleShow(false);
        }
    }

    handleEditClick() {
        if (this.props.clickable.indexOf('edit') >= 0) {
            this.handleShow(!this.state.showList);
        }
    }

    handleItemClick(event) {
        this.updateText(event.key);
        this.handleShow(false);
        if (this.props.onChange && this.key !== event.key) {
            this.props.onChange({
                name: this.props.name,
                data: this.props.data,
                value: event.key
            });
        }
        this.key = event.key;
        this.index = event.index;
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

    handleBlur(event) {
        if (!find(event.relatedTarget, event.currentTarget)) {
            this.handleShow(false);
        }
    }

    updateText(value) {

        if (value === undefined) {
            return;
        }

        let item = this.helper.getShowItem(value);

        if (item) {
            if (item.index === -1) {
                this.setState({showText: '', value: value});
            } else {
                this.setState({showText: item.value, value: value});
            }
        } else {
            this.setState({showText: '', value: value});
        }

    }

    getContainerStyle() {
        if (this.state.showList) {
            this.containerHeight = this.container.current.style.height ?
                this.container.current.style.height : 'auto';
            let rect = this.container.current.getBoundingClientRect();
            return {
                height: rect.height + 'px'
            }
        } else {
            return {
                height: this.containerHeight
            }
        }
    }

    render () {

        let style = merge(styles.TComponent, styles.TText, this.props.style);

        let label = null;
        if (this.props.label) {
            label =
                <div style={style.label} onClick={this.handleLabelClick}>
                    {this.props.label}
                </div>
        }

        let icon = null;
        if (this.props.showIcon) {
            icon =
                <Icon
                    style={style.icon}
                    name={this.state.showList ? 'up' : 'down'}
                    onClick={this.handleIconClick} />
        }

        let list = null;
        if (this.state.showList && this.props.items) {
            list =
                <List
                    ref={this.list}
                    style={style.list}
                    selected={this.state.value}
                    hover={this.state.hover}
                    items={this.helper.getListItems()}
                    onClick={this.handleItemClick} />
        }

        let containerStyle = merge(style.container, this.getContainerStyle());

        return (
            <div style={containerStyle} ref={this.container} onBlur={this.handleBlur} tabIndex={-1}>
                <div style={style.frame} ref={this.frame}>
                    {label}
                    <Edit
                        ref={this.edit}
                        vStyle={style.edit}
                        iStyle={style.edit}
                        data={this.props.data}
                        name={this.props.name}
                        value={this.state.showText}
                        timeout={this.props.timeout}
                        placeholder={this.props.placeholder}
                        wrap={false}
                        readOnly={!this.props.editable}
                        onClick={this.handleEditClick}
                        onKeyDown={this.handleKeyDown}
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
    clickable: PropTypes.string,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    onValidate: PropTypes.func
};

ListBox.defaultProps = {
    listMode: 'key val',
    showMode: 'val',
    showIcon: true,
    editable: false,
    clickable: 'label edit'
};

export default ListBox;
