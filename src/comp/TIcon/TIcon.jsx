import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge} from '../../util';

import styles from '../../styles';

class TIcon extends React.Component {

    render () {

        let style = merge(styles.icon, styles.ticon, this.props.style);

        return (
            <Icon
                style={style}
                name={this.props.name}
                data={this.props.data}
                onClick={this.props.onClick} />
        );
    }

}

TIcon.icons = Icon.icons;

TIcon.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
    data: PropTypes.any,
    onClick: PropTypes.func
};

export default TIcon;
