import React from 'react';
import PropTypes from 'prop-types';

import {ListBox} from '../../lib';

import {merge} from '../../util';

import styles from '../../styles';


class TListBox extends React.Component {

    render() {

        let style = merge(
            styles.TComponent,
            styles.TListBox,
            styles[this.props.name],
            this.props.style
        );

        return (
            <ListBox
                style={style}
                value={this.props.value}
                name={this.props.name}
                data={this.props.data}
                label={this.props.label}
                showIcon={this.props.showIcon}
                timeout={this.props.timeout}
                placeholder={this.props.placeholder}
                empty={this.props.empty}
                items={this.props.items}
                listMode={this.props.listMode}
                showMode={this.props.showMode}
                searchLength={this.props.searchLength}
                clickable={this.props.clickable}
                readOnly={this.props.readOnly}
                layout={this.props.layout}
                onSearch={this.props.onSearch}
                onChange={this.props.onChange}
                onValidate={this.props.onValidate} />
        );

    }

}

TListBox.propTypes = {
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
    clickable: PropTypes.string,
    searchLength: PropTypes.number,
    readOnly: PropTypes.any,
    layout: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onSearch: PropTypes.func
};

TListBox.defaultProps = {
    showIcon: true
};

export default TListBox;
