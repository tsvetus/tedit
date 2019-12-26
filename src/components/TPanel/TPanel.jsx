import React from 'react';
import PropTypes from 'prop-types';

import {merge} from '../../util';

import styles from '../../styles';

class TPanel extends React.Component {

    render () {

        let dir = {};
        if (this.props.dir === 'row') {
            dir = {
                flexDirection: "row"
            }
        }

        let align = {};
        if (this.props.align === 'right') {
            align = {
                justifyContent: "flex-end"
            }
        }

        let style = merge(
            styles.TPanel,
            styles[this.props.name],
            dir,
            align,
            this.props.style
        );

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );

    }

}

TPanel.propTypes = {
    style: PropTypes.object,
    dir: PropTypes.string,
    align: PropTypes.string
};

export default TPanel;
