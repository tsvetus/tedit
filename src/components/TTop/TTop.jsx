import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

class TTop extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data,
                icon: event.name
            });
        }
    }

    render () {

        let style = merge(
            contain(styles.TTop),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let tools = [];
        if (this.props.tools) {
            this.props.tools.forEach((v, i) => {
                let st = {
                    ...style.icon,
                    ...v.style
                };
                tools.push(<Icon key={i} name={v.icon}
                    onClick={v.onClick} style={st} />);
            });
        }

        let caption = this.props.caption ? this.props.caption : null;

        return (
            <div style={style.container}>
                {this.props.burger ? <Icon
                    name="menu"
                    style={style.button}
                    onClick={this.handleClick} /> : <div></div>}
                <div style={style.caption}>{caption}</div>
                <div style={style.tools}>{tools}</div>
            </div>
        );

    }

}

TTop.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    tools: PropTypes.array,
    caption: PropTypes.string,
    burger: PropTypes.any,
    onClick: PropTypes.func
};

TTop.defaultProps = {
    burger: true
};

export default TTop;
