import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

const DEFAULT_SIDE_WIDTH = "300px";
const DEFAULT_TOUCH_WIDTH = 50;
const DEFAULT_INIT_WIDTH = "16px";

class TSide extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = this.calcState(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleEndS = this.handleEndS.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.calcState = this.calcState.bind(this);
        this.doClick = this.doClick.bind(this);
    }

    componentDidUpdate(old) {
        if (old.show !== this.props.show) {
            this.setState(this.calcState(this.props));
        }
    }

    handleClose() {
        this.setState({width: 0});
        this.doClick(-1, {name: "close"});
    }

    handleClick(event) {
        this.setState({width: 0});
        let name = event.target.getAttribute('name');
        let index = event.target.getAttribute('index');
        let item = this.props.items && index >= 0 ? this.props.items[index] : null;
        if (item) {
            this.doClick(index, item);
        } else {
            this.doClick(-1, {name: name});
        }
    }

    handleMove(event) {
        event.stopPropagation();
        this.setState({width: event.touches[0].clientX})
    }

    handleStart(event) {
        event.stopPropagation();
        this.pos = event.touches[0].clientX;
    }

    handleEnd(event) {
        event.stopPropagation();
        let pos = event.changedTouches[0].clientX;
        let diff = pos - this.pos;
        if (diff > this.state.touchWidth) {
            this.setState({width: this.state.sideWidth});
        } else {
            this.setState({width: 0});
            this.doClick(-1, {name: "close"});
        }
    }

    handleEndS(event) {
        event.stopPropagation();
        let pos = event.changedTouches[0].clientX;
        let diff = pos - this.pos;
        if (diff < -this.state.touchWidth) {
            this.setState({width: 0});
            this.doClick(-1, {name: "close"});
        } else {
            this.setState({width: this.state.sideWidth});
        }
    }

    handleBlur() {
        this.doClick(-1, {name: "close"});
    }

    calcState(props) {
        let sideWidth = props.width ? props.width : DEFAULT_SIDE_WIDTH;
        let touchWidth = props.touchWidth ? props.touchWidth : DEFAULT_TOUCH_WIDTH;
        let initWidth = props.initWidth ? props.initWidth : DEFAULT_INIT_WIDTH;
        return {
            width: props.show ? sideWidth : 0,
            sideWidth: sideWidth,
            touchWidth: touchWidth,
            initWidth: initWidth
        }
    }

    doClick(index, item) {
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data,
                index: index,
                item: item
            });
        }
    }
    
    render () {

        let style = merge(
            contain(styles.TSide),
            contain(styles[this.props.name]),
            {container: {width: this.state.width}},
            {frame: {width: this.props.width}},
            contain(this.props.style)
        );

        let items = [];
        if (this.props.items) {
            this.props.items.forEach((v, i) => {
                items.push(
                    <div
                        onTouchMove={this.handleMove}
                        key={i}
                        index={i}
                        style={{
                            ...style.item,
                            ...v.style
                        }}
                        onClick={this.handleClick}
                        name={v.name}>
                        {v.caption}
                    </div>
                );
            });
        }

        return (

            <div
                style={style.container}
                onTouchMove={this.handleMove}
                onTouchStart={this.handleStart}
                onTouchEnd={this.handleEndS}
                onBlur={this.handleBlur}>

                <Icon
                    name="close"
                    style={style.close}
                    onClick={this.handleClose} />

                <div style={style.frame}>
                    {items}
                    {this.props.children}
                </div>

                <div
                    style={{...style.touch, width: this.state.initWidth}}
                    onTouchMove={this.handleMove}
                    onTouchStart={this.handleStart}
                    onTouchEnd={this.handleEnd}>
                </div>

            </div>

        );

    }

}

TSide.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    items: PropTypes.array,
    show: PropTypes.any,
    params: PropTypes.object,
    width: PropTypes.string,
    touchWidth: PropTypes.number,
    initWidth: PropTypes.string,
    onClick: PropTypes.func
};

TSide.defaultProps = {
    width: DEFAULT_SIDE_WIDTH,
    touchWidth: DEFAULT_TOUCH_WIDTH,
    initWidth: DEFAULT_INIT_WIDTH
};

export default TSide;
