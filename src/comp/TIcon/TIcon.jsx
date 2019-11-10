import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

class TIcon extends React.Component {

    render () {
        return (
            <Icon
                style={this.props.style}
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
