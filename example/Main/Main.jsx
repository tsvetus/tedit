import React from 'react';

import {
    TIcon,
    TText,
    TMemo,
    TGroup,
    TListBox,
    TCheck,
    TSearch,
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
            tsearch: null
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
                <div key={key} style={iconLabelStyle}>
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
