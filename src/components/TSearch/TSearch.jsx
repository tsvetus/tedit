import React from 'react';
import PropTypes from 'prop-types';

import {ListBox} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

class TSearch extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }

    search(event, callback) {
//        console.log(event);
        if (this.props.onSearch) {
            return this.props.onSearch(event, callback);
        }
    }

    render () {

        let style = merge(
            contain(styles.TComponent),
            contain(styles.TSearch),
            contain(styles[this.props.name]),
            contain(this.props.style)
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
                value={this.props.value}
                empty={this.props.empty}
                readOnly={false}
                clickable={this.props.clickable}
                onSearch={this.search} />
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
    /** Empty item */
    empty: PropTypes.shape({
        /** Empty item key */
        key: PropTypes.any,
        /** Empty item value */
        value: PropTypes.string
    }),
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    chars: PropTypes.number,
    listMode: PropTypes.string,
    clickable: PropTypes.string,
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
