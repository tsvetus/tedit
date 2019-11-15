import React from 'react';
import PropTypes from 'prop-types';

import {Text} from '../../lib';

import {merge} from '../../util';

import styles from '../../styles';

/**
 * Component representing icons.
 * @extends React
 */
class TText extends React.Component {

    render () {

        let style = merge(
            styles.TComponent,
            styles.TText,
            styles[this.props.name],
            this.props.style
        );

        return (
            <Text
                style={style}
                data={this.props.data}
                name={this.props.name}
                value={this.props.value}
                label={this.props.label}
                icon={this.props.icon}
                timeout={this.props.timeout}
                placeholder={this.props.placeholder}
                mask={this.props.mask}
                empty={this.props.empty}
                onValidate={this.props.onValidate}
                onIcon={this.props.onIcon}
                onMask={this.props.onMask}
                onChange={this.props.onChange} />
        );

    }

}

TText.propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    icon: PropTypes.string,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    mask: PropTypes.object,
    empty: PropTypes.any,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onIcon: PropTypes.func,
    onMask: PropTypes.func
};

export default TText;
