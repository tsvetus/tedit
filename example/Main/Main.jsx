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
    styles,
    registerStyles,
    nvl
} from 'tedit';

registerStyles({

    icon: {
        margin: "4px",
        width: "32px",
        height: "32px"
    },

    component: {

        container: {
            margin: "16px 0 0 0",
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

    },

    tgroup: {
        container: {
            width: "420px",
            margin: "auto"
        }
    },

    tpanel: {
        padding: "16px"
    }

});

const iconLabelStyle = {
    ...styles.component.label,
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
            ttext: null,
            ttext1: null,
            ttext2: null,
            tmemo: null,
            tcheck: 1,
            tlistbox: null,
            tsearch: null,
            tlogin: {username: 'user', password: ''},
            showLogin: false,
            showModal: false,
            showForm: false,
            showMenu: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        let events = this.state.events + JSON.stringify(event) + ' ';

        if (event.name === 'ttop' && event.icon === 'menu') {
            this.setState({
                showMenu: true
            });
        } else if (event.name === 'tside') {
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
                        style={styles.icon} />
                </div>);
        }

        return (

            <div style={{}}>

                <TSide
                    name={'tside'}
                    show={this.state.showMenu}
                    items={[
                        {name: 'first', caption: 'First menu item'},
                        {name: 'second', caption: 'Second menu item', style: {fontWeight: "bold"}}
                    ]}
                    onClick={this.handleChange} />

                <TTop
                    name={'ttop'}
                    onClick={this.handleChange} />

                <TPanel>
                    tedit library example page
                </TPanel>

                <TGroup label={'Edit component examples'}>

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
                        onValidate={(event) => {
                            return nvl(event.value, '').length >= 3;
                        }}
                        onChange={this.handleChange} />

                    <TText
                        value={this.state.ttext2}
                        label={'Enter phone number:'}
                        name={'ttext2'}
                        mask={{mask: '+1 (NNN) NNN-NN-NN', empty: '_', complete: true}}
                        onChange={this.handleChange} />

                    <TListBox
                        name={'tlistbox'}
                        label={'TList box:'}
                        listMode={'key value'}
                        showMode={'value'}
                        empty={{id: null, name: '-'}}
                        value={this.state.tlistbox}
                        items={[
                            {id: 1, name: 'first item'},
                            {id: 2, name: 'second item'}
                        ]}
                        placeholder={'Choose item from list ...'}
                        onChange={this.handleChange} />

                    <TCheck
                        label={'Check me:'}
                        name={'tcheck'}
                        value={this.state.tcheck}
                        checked={1}
                        unchecked={0}
                        onChange={this.handleChange} />

                    <TSearch
                        name={'tsearch'}
                        label={'TSearch:'}
                        listMode={'key value'}
                        showMode={'value'}
                        value={this.state.tsearch}
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
                        value={this.state.tmemo}
                        label={'TMemo component:'}
                        name={'tmemo'}
                        data={3}
                        placeholder={'Enter multiline text. Use "wrap" property to enable caret returns.'}
                        onChange={this.handleChange} />

                </TGroup>

                <TGroup label={'Other controls'}>

                    <TButton
                        name={'showLogin'}
                        onClick={this.handleChange}>
                        Show login
                    </TButton>

                    <TButton
                        name={'showModal'}
                        onClick={this.handleChange}>
                        Show modal
                    </TButton>

                    <TButton
                        name={'showForm'}
                        onClick={this.handleChange}>
                        Show form
                    </TButton>

                    <TIndicator open={true} />
                    <TIndicator open={false} />

                </TGroup>

                <TGroup label={'Events'}>

                    <TMemo
                        style={{edit: {border: "none"}}}
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

                <a style={styles.component.label} href={'./jsdoc/index.html'}>See full generated documentation here</a>

            </div>

        );

    }

}

export default Main;
