import React from 'react';

import {
    TIcon,
    TText,
    TMemo,
    TGroup,
    TListBox,
    TCheck,
    TSearch,
    TButton,
    TIndicator,
    TLogin,
    TModal,
    TForm,
    TPanel,
    TTop,
    TSide,
    TScroll,
    styles,
    registerStyles,
    nvl
} from 'tedit';

registerStyles({

    TIcon: {
        width: "32px",
        height: "32px"
    },

    TComponent: {

        container: {
            margin: "8px 0 0 0",
            width: "100%",
            maxWidth: "400px"
        },

        label: {
            textAlign: "right"
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

});

const iconLabelStyle = {
    ...styles.TComponent.label,
    display: "flex",
    alignItems: "center",
    margin: "8px"
};

const LIST = [
    {id: 1, name: 'first item'},
    {id: 2, name: 'second item'},
    {id: 3, name: 'third item'}
];


class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            events: '',
            text: null,
            text1: null,
            text2: null,
            memo: null,
            check: 1,
            listBox: null,
            search: null,
            login: {username: 'user', password: ''},
            showLogin: false,
            showModal: false,
            showForm: false,
            showMenu: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        let events = this.state.events + JSON.stringify(event) + ' ';

        if (event.name === 'top' && event.icon === 'menu') {
            this.setState({
                showMenu: true
            });
        } else if (event.name === 'side') {
            this.setState({
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

                        <TText
                            style={{label: {width: "180px"}}}
                            value={this.state.text1}
                            label={'TText component:'}
                            name={'text1'}
                            placeholder={'Enter single line text ...'}
                            password={'*'}
                            onChange={this.handleChange} />

                        <TText
                            style={{label: {width: "180px"}}}
                            value={this.state.text2}
                            label={'TText with validation:'}
                            name={'text2'}
                            placeholder={'Enter more than 3 symbols ...'}
                            onValidate={(event) => {
                                return nvl(event.value, '').length >= 3;
                            }}
                            onChange={this.handleChange} />

                        <TText
                            style={{label: {width: "180px"}}}
                            value={this.state.text3}
                            label={'Enter phone number:'}
                            name={'text3'}
                            mask={{mask: '+1 (NNN) NNN-NN-NN', empty: '_', complete: true}}
                            onChange={this.handleChange} />

                        <TListBox
                            style={{label: {width: "180px"}}}
                            name={'listBox'}
                            label={'TList box:'}
                            listMode={'key value'}
                            showMode={'value'}
                            empty={{id: null, name: '-'}}
                            value={this.state.listBox}
                            items={[
                                {id: 1, name: 'first item'},
                                {id: 2, name: 'second item'}
                            ]}
                            placeholder={'Choose item from list ...'}
                            onChange={this.handleChange} />

                        <TCheck
                            style={{frame: {justifyContent: "flex-start"}, label: {width: "180px"}}}
                            label={'Check me:'}
                            name={'check'}
                            value={this.state.check}
                            checked={1}
                            unchecked={0}
                            onChange={this.handleChange} />

                        <TSearch
                            style={{label: {width: "180px"}}}
                            name={'search'}
                            label={'TSearch:'}
                            listMode={'key value'}
                            showMode={'value'}
                            value={this.state.search}
                            placeholder={'Type word "item"'}
                            onSearch={event => {
                                    return LIST.filter(v => {
                                        return v.name.indexOf(nvl(event.value, '')) >= 0 ||
                                            v.id == event.key;
                                    });
                                }
                            }
                            onChange={this.handleChange} />

                        <TMemo
                            value={this.state.memo}
                            label={'TMemo component:'}
                            name={'memo'}
                            placeholder={'Enter multiline text. Use "wrap" property to enable caret returns.'}
                            onChange={this.handleChange} />

                    </TGroup>

                    <TGroup label={'Other controls'}>

                        <TButton
                            style={{...styles.button, margin: "16px"}}
                            name={'showLogin'}
                            onClick={this.handleChange}>
                            Show login
                        </TButton>

                        <TButton
                            style={{...styles.button, margin: "16px"}}
                            name={'showModal'}
                            onClick={this.handleChange}>
                            Show modal
                        </TButton>

                        <TButton
                            style={{...styles.button, margin: "16px"}}
                            name={'showForm'}
                            onClick={this.handleChange}>
                            Show form
                        </TButton>

                        <TButton
                            style={{...styles.button, margin: "16px"}}
                            onClick={() => {this.setState({events: ''})}}>
                            Clear events
                        </TButton>

                        <div style={{width: "100%", display: "flex"}}>
                            <TIndicator open={true} />
                            <TIndicator open={false} />
                        </div>

                    </TGroup>

                    <TGroup label={'Events'} style={{padding: "4px"}}>

                        <TMemo
                            style={{container: {margin: "0", width: "100%", maxWidth: "auto"}, edit: {border: "none"}}}
                            value={this.state.events} />

                    </TGroup>

                    <TGroup label={'TEdit icon list'}>
                        {icons}
                    </TGroup>

                    <TLogin
                        style={{
                            container: {
                                width: "420px"
                            },
                            component: {
                                label: {
                                    width: "120px"
                                }
                            }
                        }}
                        name={'showLogin'}
                        value={this.state.tlogin}
                        show={this.state.showLogin}
                        onLogin={this.handleChange} />

                    <TModal
                        style={{content: {textAlign: "center"}}}
                        name={'showModal'}
                        caption={'CAPTION'}
                        show={this.state.showModal}
                        wait={10}
                        onClose={this.handleChange} >
                        Modal content
                    </TModal>

                    <TForm
                        style={{
                            content: {
                                textAlign: "center"
                            }
                        }}
                        name={'showForm'}
                        caption={'FORM'}
                        show={this.state.showForm}
                        buttons={{'cancel': 'Cancel', 'save': 'Save'}}
                        onClose={this.handleChange} >
                        Form content
                    </TForm>

                    <div style={{margin: "16px"}}>
                        <a
                            style={styles.TComponent.label}
                            href={'./jsdoc/index.html'}>
                            See full generated documentation here
                        </a>
                    </div>

                </TScroll>

            </div>

        );

    }

}

export default Main;
