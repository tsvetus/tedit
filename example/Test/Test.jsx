import React from 'react';

import {
    TIcon,
    TText,
    TMemo,
    TGroup,
    TListBox,
    TCheck,
    TButton,
    TIndicator,
    TLogin,
    TModal,
    TForm,
    TPanel,
    TTop,
    TSide,
    TScroll,
    TDate,
    TTime,
    styles,
    registerStyles,
    nvl
} from 'tedit';

import {Edit} from '../../src/lib';

registerStyles(

    {

        TIcon: {
            width: "32px",
            height: "32px"
        },

        TComponent: {

            container: {
                margin: "8px 0 0 0",
                width: "100%",
                maxWidth: "440px"
            },

            icon: {
                width: "18px",
                height: "18px"
            }

        },

        TGroup: {

            container: {
                maxWidth: "520px",
                margin: "auto",
                marginTop: "16px"
            },

            content: {
                justifyContent: "space-around"
            }

        },

        TPanel: {
            padding: "16px"
        },

        TScroll: {
            padding: "16px"
        },

        memo: {
            container: {
                maxWidth: "auto",
                width: "100%"
            }
        }

    },

    {

        colors: {
            window: "#999"
        }

    }

);

const iconLabelStyle = {
    ...styles.TComponent.label,
    display: "flex",
    alignItems: "center",
    margin: "8px"
};

const LIST = [
    {id: 1, name: 'first item', title: null, description: null},
    {id: 2, name: 'second item', title: null, description: null},
    {id: 3, name: 'third item', title: null, description: null}
];


class Test extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            events: '',
            text1: null,
            text2: null,
            text3: null,
            text4: '+7 905 745-81-11',
            memo: null,
            check: 1,
            listBox: null,
            search: 1,
            time: new Date(),
            date: null,
            login: {username: 'user', password: ''},
            showLogin: false,
            showModal: false,
            showForm: false,
            showMenu: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    handleChange(event) {

        let events = this.state.events + JSON.stringify(event) + ' ';

        if (event.name === 'top' && event.icon === 'menu') {
            this.setState({
                events: events,
                showMenu: true
            });
        } else if (event.name === 'side') {
            this.setState({
                events: events,
                showMenu: false
            });
        } else if (event.name.indexOf('show') >= 0) {
            this.setState({
                events: events,
                [event.name]: !this.state[event.name]
            });
        } else {
            this.setState({
                events: events,
                [event.name]: event.value
            });
        }

    }

    search(event, callback) {
        let items = LIST.filter(v => {
            return v.name.indexOf(event.value) >= 0 || v.id == event.key;
        });
        setTimeout(() => {
            callback(items);
        }, 500);
    }

    render() {

        let icons = [];
        for (let key in TIcon.icons) {
            icons.push(
                <div key={key} style={iconLabelStyle}>
                    {key + ':'}
                    <TIcon
                        name={key}
                        style={styles.icon}
                        onClick={this.handleChange} />
                </div>);
        }

        return (

            <div style={{textAlign: "center"}}>

                <TSide
                    name={'side'}
                    show={this.state.showMenu}
                    items={[
                        {name: 'first', caption: 'First menu item'},
                        {name: 'second', caption: 'Second menu item', style: {fontWeight: "bold"}}
                    ]}
                    onClick={this.handleChange} />

                <TTop
                    name={'top'}
                    onClick={this.handleChange} />

                <TPanel>
                    tedit library example page
                </TPanel>

                <TScroll>

                    <TGroup label={'Edit component examples'}>

                        <TMemo
                            style={{label: {width: "180px"}}}
                            value={this.state.text1}
                            label={'TText component:'}
                            name={'text1'}
                            layout={'top'}
                            placeholder={'Enter single line text ...'}
                            onChange={this.handleChange} />

                    </TGroup>

                </TScroll>

            </div>

        );

    }

}

export default Test;
