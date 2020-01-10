import React from 'react';

import {
    TIcon,
    TText,
    TMemo,
    TGroup,
    TListBox,
    TCheck,
    TButton,
    TLogin,
    TModal,
    TForm,
    TPanel,
    TTop,
    TSide,
    TScroll,
    TDate,
    TTime,
    registerStyles,
    nvl,
    styles
} from 'tedit';

const style = {

    TScroll: {
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px"
        }
    },

    TComponent: {
        container: {
            margin: "8px"
        }
    },

    TGroup: {
        container: {
            margin: "8px",
            maxWidth: "600px"
        },
        content: {
            display: "flex",
            justifyContent: "flex-start"
        }
    }

};

registerStyles(style);

const LIST = [
    {id: 1, name: 'first item', title: null, description: null},
    {id: 2, name: 'second item', title: null, description: null},
    {id: 3, name: 'third item', title: null, description: null}
];


class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {

            events: '',

            topLabel: null,
            regExp: null,
            customVal: null,
            maskVal: '+7 111 111-11-11',

            listBox: 2,
            searchBox: null,


            memoEdit: null,
            timeEdit: new Date(),
            dateEdit: null,

            sideMenu: false,


            login: {username: 'user', password: ''},

            modalDialog: false,
            modalForm: false,
            loginForm: false,

            wait: false

        };

        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleComponentChange = this.handleComponentChange.bind(this);
        this.handleDialogs = this.handleDialogs.bind(this);
        this.handleWait = this.handleWait.bind(this);
        this.search = this.search.bind(this);

    }

    handleIconClick(event) {
        this.setState({events: this.state.events + JSON.stringify(event) + ' '})
    }

    handleMenuClick(event) {
        if (event.name === 'topMenu' && event.icon === 'menu') {
            this.setState({sideMenu: true})
        } else if (event.name === 'sideMenu') {
            this.setState({sideMenu: false});
        }
        this.setState({events: this.state.events + JSON.stringify(event) + ' '})
    }

    handleComponentChange(event) {
        this.setState({
            events: this.state.events + JSON.stringify(event) + ' ',
            [event.name]: event.value
        });
    }

    handleDialogs(event) {
        this.setState({
            events: this.state.events + JSON.stringify(event) + ' ',
            [event.name]: !this.state[event.name]
        })
    }

    handleWait() {
        this.setState({wait: true});
        setTimeout(() => {
            this.setState({wait: false});
        }, 1000);
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
                <div key={key} style={{margin: "8px", color: styles.colors.border}}>
                    {key + ':'}
                    <TIcon
                        name={key}
                        onClick={this.handleIconClick} />
                </div>);
        }

        return (

            <div style={{textAlign: "center"}}>

                <TSide
                    name={'sideMenu'}
                    show={this.state.sideMenu}
                    items={[
                        {name: 'first', caption: 'First menu item'},
                        {name: 'second', caption: 'Second menu item', style: {fontWeight: "bold"}}
                    ]}
                    onClick={this.handleMenuClick} />

                <TTop
                    name={'topMenu'}
                    onClick={this.handleMenuClick} />

                <TPanel>
                    {'tedit library example page'}
                </TPanel>

                <TScroll>

                    <TGroup
                        label={'Edit component examples'}>

                        <TText
                            value={this.state.topLabel}
                            label={'TText with top label:'}
                            name={'topLabel'}
                            layout={'top'}
                            placeholder={'Enter single line text ...'}
                            onChange={this.handleComponentChange} />

                        <TText
                            style={{label: {width: "180px"}}}
                            value={this.state.regExp}
                            label={'TText with RegExp validation:'}
                            name={'regExp'}
                            regexp={TText.regexp['email']}
                            placeholder={'Enter email address ...'}
                            onChange={this.handleComponentChange} />

                        <TText
                            style={{label: {width: "180px"}}}
                            value={this.state.customVal}
                            label={'TText with custom validation:'}
                            name={'customVal'}
                            placeholder={'Enter more than 3 symbols ...'}
                            onValidate={(event) => {
                                return nvl(event.value, '').length > 3;
                            }}
                            onChange={this.handleComponentChange} />

                        <TText
                            style={{label: {width: "180px"}}}
                            value={this.state.maskVal}
                            label={'TText with mask:'}
                            name={'maskVal'}
                            format={{mask: '+1 (NNN) NNN-NN-NN', empty: '_'}}
                            required={true}
                            onChange={this.handleComponentChange} />

                        <TListBox
                            style={{label: {width: "180px"}}}
                            layout={'top'}
                            name={'listBox'}
                            label={'TListBox with items:'}
                            empty={{id: null, name: '-'}}
                            value={this.state.listBox}
                            items={[
                                {id: 1, name: 'first item'},
                                {id: 2, name: 'second item'}
                            ]}
                            placeholder={'Choose item from list ...'}
                            onChange={this.handleComponentChange} />

                        <TListBox
                            style={{label: {width: "180px"}}}
                            showIcon={false}
                            name={'searchBox'}
                            label={'TListBox with search:'}
                            empty={{id: null, name: '-'}}
                            value={this.state.searchBox}
                            placeholder={'Type word "item" ...'}
                            onSearch={(event, callback) => {
                                this.search(event, callback);
                            }}
                            onChange={this.handleComponentChange} />

                        <TCheck
                            style={{container: {width: "160px"}}}
                            label={'TCheck:'}
                            name={'checkBox'}
                            value={this.state.checkBox}
                            checked={1}
                            unchecked={0}
                            onChange={this.handleComponentChange} />

                        <TDate
                            style={{container: {width: "160px"}}}
                            name={'dateEdit'}
                            value={this.state.dateEdit}
                            label={'TDate:'}
                            onChange={this.handleComponentChange} />

                        <TTime
                            style={{container: {width: "160px"}}}
                            name={'timeEdit'}
                            value={this.state.timeEdit}
                            label={'TTime:'}
                            onChange={this.handleComponentChange} />

                        <TMemo
                            style={{edit: {minHeight: "80px"}}}
                            value={this.state.memoEdit}
                            label={'TMemo:'}
                            name={'memoEdit'}
                            placeholder={'Enter multiline text. Use "wrap" property to enable caret returns.'}
                            onChange={this.handleComponentChange} />

                    </TGroup>

                    <TGroup label={'Other controls'}>

                        <TButton
                            style={{margin: "16px"}}
                            name={'loginDialog'}
                            onClick={this.handleDialogs}>
                            {'Show login'}
                        </TButton>

                        <TButton
                            style={{margin: "16px"}}
                            name={'modalDialog'}
                            onClick={this.handleDialogs}>
                            {'Show modal'}
                        </TButton>

                        <TButton
                            style={{margin: "16px"}}
                            name={'formDialog'}
                            onClick={this.handleDialogs}>
                            {'Show form'}
                        </TButton>

                        <TButton
                            style={{margin: "16px"}}
                            onClick={() => {this.setState({events: ''})}}>
                            {'Clear events'}
                        </TButton>

                        <TButton
                            style={{margin: "16px"}}
                            name={'waitButton'}
                            wait={this.state.wait}
                            onClick={this.handleWait}>
                            {'Wait button'}
                        </TButton>

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
                        name={'loginDialog'}
                        value={this.state.login}
                        show={this.state.loginDialog}
                        onLogin={this.handleDialogs} />

                    <TModal style={{content: {textAlign: "center"}}}
                        name={'modalDialog'}
                        caption={'CAPTION'}
                        show={this.state.modalDialog}
                        wait={10}
                        onClose={this.handleDialogs} >
                        Modal content
                    </TModal>

                    <TForm
                        style={{
                            content: {
                                textAlign: "center"
                            }
                        }}
                        name={'formDialog'}
                        caption={'FORM'}
                        show={this.state.formDialog}
                        buttons={{'cancel': 'Cancel', 'save': 'Save'}}
                        onClose={this.handleDialogs} >
                        Form content
                    </TForm>

                </TScroll>

            </div>

        );

    }

}

export default Main;
