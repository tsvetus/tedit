import React from 'react';
import PropTypes from 'prop-types';

import Props from '../Props';

class Component extends React.Component {

    render () {

        let desc = this.props.data ? this.props.data.description : null;
        let props = null;
        if (this.props.data && this.props.data.props) {
            props = <Props data={this.props.data.props} />;
        }

        return (
            <div>
                <div>{desc}</div>
                {props}
            </div>
        );

    }

}

Component.propTypes = {
    data: PropTypes.object
};

export default Component;