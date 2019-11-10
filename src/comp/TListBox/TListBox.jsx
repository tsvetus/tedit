import React from 'react';
import PropTypes from 'prop-types';

import {ListBox} from '../../lib';

class TListBox extends React.Component {
    render() {
        return (
            <ListBox
                style={this.props.style}
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
                editable={false}
                clickable={this.props.clickable}
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
    clickable: PropTypes.any,
    onChange: PropTypes.func,
    onValidate: PropTypes.func
};

TListBox.defaultProps = {
    showIcon: true,
    clickable: true
};

export default TListBox;
