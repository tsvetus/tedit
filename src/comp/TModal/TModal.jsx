import React from 'react';
import PropTypes from 'prop-types';

import {merge, seconds} from '../../util';
import {Icon} from '../../lib';

import styles from '../../styles';

const ICON_CLOSE = 'close';

class TModal extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            timer: null,
            wait: 0
        };
        this.handleCancel = this.handleCancel.bind(this);
    }

    close() {
        this.stopTimer();
        if (this.props.onClose) {
            this.props.onClose({
                name: this.props.name,
                data: this.props.data,
                button: ICON_CLOSE
            });
        }
    }

    handleCancel() {
        this.close();
    }

    componentDidMount() {
        this.setTimer();
    }

    componentDidUpdate(old) {
        if (this.props.show && old.show !== this.props.show) {
            this.setTimer();
        } else if (!this.props.show) {
            this.stopTimer();
        }
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    setTimer() {
        let wait = this.props.wait;
        if (wait) {
            if (isNaN(wait)) {
                wait = seconds(wait);
            }
            if (wait > 0) {
                this.setState({
                    wait: wait,
                    timer: setInterval(
                        () => {
                            this.setState({wait: this.state.wait - 1});
                            if (this.state.wait <= 0) {
                                this.close();
                            }
                        },
                        1000
                    )
                });
            }
        }
    }

    stopTimer() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.setState({timer: null});
        }
    }

    render () {

        let style = merge(
            styles.modal,
            this.props.style, {
                screen: {
                    display: this.props.show ? 'block' : 'none'
                }
            }
        );

        let wait = this.state.wait > 0 ? this.state.wait : null;

        let header = null;
        if (this.props.showHeader) {
            header =
                <div style={style.header}>
                    <div style={style.timer}>{wait}</div>
                    <div style={style.caption} dangerouslySetInnerHTML={{ __html: this.props.caption}}></div>
                    <Icon style={style.close} name={ICON_CLOSE} onClick={this.handleCancel} />
                </div>
        }

        return (
            <div style={style.screen}>
                <div style={style.container}>
                    {header}
                    <div style={style.content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );

    }

}

TModal.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    show: PropTypes.any,
    wait: PropTypes.any,
    caption: PropTypes.string,
    showHeader: PropTypes.any,
    onClose: PropTypes.func.isRequired
};

TModal.defaultProps = {
    showHeader: true
};

export default TModal;
