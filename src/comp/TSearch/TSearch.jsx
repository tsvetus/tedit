import React from 'react';
import PropTypes from 'prop-types';

import {ListBox} from '../../lib';

import {nvl, merge} from '../../util';

import styles from '../../styles';

class TSearch extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            items: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        this.updateValue(this.props.value);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.updateValue(this.props.value);
        }
    }

    updateValue(value) {
        if (this.props.onSearch) {
            let items = this.props.onSearch({key: value});
            if (items) {
                this.setState({items: items, value: value});
            }
        }
    }

    handleSearch(event) {
        if (nvl(event.value, '').length >= this.props.chars && this.props.onSearch) {
            let items = this.props.onSearch(event);
            if (items && items instanceof Array) {
                this.setState({items: items});
                return items;
            }
        }
        return null;
    }

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    render () {

        let style = merge(
            styles.TComponent,
            styles.TSearch,
            styles[this.props.name],
            this.props.style
        );

        return (
            <ListBox
                style={style}
                data={this.props.data}
                name={this.props.name}
                label={this.props.label}
                showIcon={this.props.showIcon}
                timeout={this.props.timeout}
                placeholder={this.props.placeholder}
                listMode={this.props.listMode}
                showMode={this.props.showMode}
                onChange={this.props.onChange}
                items={this.state.items}
                value={this.state.value}
                editable={true}
                clickable={this.props.clickable}
                onSearch={this.handleSearch} />
        );

    }

}

TSearch.propTypes = {
    style: PropTypes.object,
    value: PropTypes.any,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    showIcon: PropTypes.any,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    chars: PropTypes.number,
    listMode: PropTypes.string,
    clickable: PropTypes.any,
    showMode: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onSearch: PropTypes.func
};

TSearch.defaultProps = {
    chars: 3,
    showIcon: true
};

export default TSearch;
