import React from 'react';

import {TIcon, TText, TMemo, TGroup, styles, registerStyles} from 'tedit';

registerStyles({

    icon: {
        margin: "4px",
        width: "32px",
        height: "32px"
    },

    iconBox: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },

    label: {
        ...styles.component.label,
        display: "flex",
        alignItems: "center",
        margin: "8px"
    },

    component: {

        container: {
            margin: "8px 8px 8px 8px",
            width: "100%"
        },

        invalid: {
            edit: {
                backgroundColor: "#eea"
            }
        },

        icon: {
            width: "18px",
            height: "18px"
        }

    }

});

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            events: '',
            ttext: '',
            ttext1: '',
            ttext2: '',
            tmemo: 'Default text'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let events = this.state.events + JSON.stringify(event) + ' ';
        this.setState({
            events: events,
            [event.name]: event.value
        });
    }

    render() {

        let icons = [];
        for (let key in TIcon.icons) {
            icons.push(
                <div key={key} style={styles.label}>
                    {key + ':'}
                    <TIcon
                        name={key}
                        style={styles.icon} />
                </div>);
        }

        return (

            <div style={{maxWidth: "420px", margin: "auto", padding: "8px"}}>

                <TGroup label={'TEdit component examples'}>

                    <TText
                        value={this.state.ttext}
                        label={'TText component:'}
                        name={'ttext'}
                        placeholder={'Enter single line text ...'}
                        onChange={this.handleChange} />

                    <TText
                        value={this.state.ttext1}
                        label={'TText with validation:'}
                        name={'ttext1'}
                        placeholder={'Enter more than 3 symbols ...'}
                        onValidate={(value) => {return value.length >= 3;}}
                        onChange={this.handleChange} />

                    <TText
                        value={this.state.ttext2}
                        label={'Enter phone number:'}
                        name={'ttext2'}
                        mask={{mask: '+1 (NNN) NNN-NN-NN', empty: '_', complete: true}}
                        onChange={this.handleChange} />

                    <TMemo
                        value={this.state.tmemo}
                        label={'TMemo component:'}
                        name={'tmemo'}
                        data={3}
                        placeholder={'Enter multiline text'}
                        onChange={this.handleChange} />

                    <TMemo
                        value={this.state.events}
                        label={'Events:'} />

                </TGroup>

                <TGroup label={'TEdit icon list'}>
                    {icons}
                </TGroup>

            </div>

        );

    }

}

export default Main;
