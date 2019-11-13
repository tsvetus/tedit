import React from 'react';
import PropTypes from 'prop-types';

import {merge} from '../../util';

import styles from '../../styles';

class TScroll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
        this.resize = this.resize.bind(this);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.resize();
        this.ref.current.addEventListener('resize', this.resize);
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        this.ref.current.removeEventListener('resize', this.resize);
    }

    resize() {

        let ov = 'auto';
        if (this.props.overflow) {
            if (this.props.overflow.toLowerCase().indexOf('aut') === 0) {
                ov = 'auto';
            } else if (this.props.scrollBars.toLowerCase().indexOf('scr') === 0) {
                ov = 'scroll';
            } else if (this.props.scrollBars.toLowerCase().indexOf('hid') === 0) {
                ov = 'hidden';
            } else if (this.props.scrollBars.toLowerCase().indexOf('vis') === 0) {
                ov = 'visible';
            }
        }

        if (this.props.scrollBars) {
            if (this.props.scrollBars.toLowerCase().indexOf('hor') === 0) {
                this.ref.current.style.overflowX = ov;
                this.ref.current.style.overflowY= 'hidden';
            } else if (this.props.scrollBars.toLowerCase().indexOf('ver') === 0) {
                this.ref.current.style.overflowY = ov;
                this.ref.current.style.overflowX = 'hidden';
            } else if (this.props.scrollBars.toLowerCase().indexOf('bot') === 0) {
                this.ref.current.style.overflow = ov;
            } else if (this.props.scrollBars.toLowerCase().indexOf('non') === 0) {
                this.ref.current.style.overflow = 'hidden';
            }
        }

        let rect = this.ref.current.getBoundingClientRect();
        let margin = this.props.margin ? this.props.margin : 0;
        let width = this.props.width ? this.props.width : window.innerWidth + 'px';
        let height = this.props.height ? this.props.height : window.innerHeight - rect.top - margin + 'px';

        this.ref.current.style.width = width;
        this.ref.current.style.height = height;

    }

    render () {

        let style = merge(
            styles.scroll,
            styles[this.props.name],
            this.props.style
        );

        return (
            <div ref={this.ref}>
                <div style={style}>
                    {this.props.children}
                </div>
            </div>
        );

    }

}

TScroll.propTypes = {
    style: PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.number,
    scrollBars: PropTypes.string,
    overflow: PropTypes.string,
    showTop: PropTypes.any
};

TScroll.defaultProps = {
    margin: 0,
    scrollBars: 'bot',
    overflow: 'auto',
    showTop: true
};

export default TScroll;
