import React from 'react';
import PropTypes from 'prop-types';

import {TIMEOUT, nvl} from '../../util';

/**
 * @class
 * @ignore
 */
class Input extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: nvl(props.value, '')};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        this.mounted = false;
    }

    componentDidUpdate(old) {
        if (nvl(old.value, '') !== nvl(this.props.value, '')) {
            this.setState({value: nvl(this.props.value, '')});
        }
    }

    handleChange(event) {
        let value = event.currentTarget.value;
        this.setState({value: value}, () => {
            if (this.props.onChange) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    if (this.mounted) {
                        this.props.onChange({
                            data: this.props.data,
                            name: this.props.name,
                            value: this.state.value
                        });
                    }
                }, this.props.timeout);
            }
        });
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick({
                data: this.props.data,
                name: this.props.name,
                value: this.state.value
            });
        }
    }

    render () {

        let style = this.props.style;

        return (
            <input
                name={this.props.name}
                style={style}
                type={this.props.type}
                value={this.state.value}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                onClick={this.handleClick} />
        );

    }

}

Input.propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    placeholder: PropTypes.string,
    timeout: PropTypes.number,
    type: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func
};

Input.defaultProps = {
    timeout: TIMEOUT
};

export default Input;
