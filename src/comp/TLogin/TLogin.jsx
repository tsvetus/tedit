import React from 'react';
import PropTypes from 'prop-types';

import TForm from '../TForm';
import TText from '../TText';

import {merge} from '../../util';

import styles from '../../styles';

class TLogin extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: null,
            password: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        this.setValue(this.props.value);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setValue(this.props.value);
        }
    }

    setValue(value) {
        if (value) {
            this.setState({
                username: value.username,
                password: value.password
            });
        }
    }

    handleClick(event) {
        this.props.onLogin({
            name: this.props.name,
            data: this.props.data,
            button: event.button,
            value: {
                username: this.state.username,
                password: this.state.password
            }
        });
    }

    handleChange(event) {
        this.setState({
            [event.name]: event.value
        });
    }

    render () {

        let style = merge(styles.modal, {component: styles.component}, this.props.style);

        return (

            <TForm
                style={style}
                name={this.props.name}
                data={this.props.data}
                show={this.props.show}
                showHeader={false}
                buttons={{
                    'cancel': this.props.labels.cancel,
                    'submit': this.props.labels.submit
                }}
                onClose={this.handleClick}>

                <TText
                    style={style.component}
                    name="username"
                    label={this.props.labels.username}
                    placeholder={this.props.placeholders.username}
                    value={this.state.username}
                    onChange={this.handleChange} />

                <TText
                    style={style.component}
                    name="password"
                    password={true}
                    label={this.props.labels.password}
                    placeholder={this.props.placeholders.password}
                    value={this.state.password}
                    onChange={this.handleChange} />

            </TForm>

        );

    }

}

TLogin.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    labels: PropTypes.object,
    value: PropTypes.object,
    placeholders: PropTypes.object,
    show: PropTypes.any,
    onLogin: PropTypes.func
};

TLogin.defaultProps = {
    labels: {
        username: 'Login:',
        password: 'Password:',
        submit: 'Submit',
        cancel: 'Cancel'
    },
    placeholders: {
        username: 'Enter login name',
        password: 'Enter password'
    }
};

export default TLogin;
