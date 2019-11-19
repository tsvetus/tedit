import React from 'react';

import {
    TSide,
    TGroup,
    TPanel,
    TTop,
    TMemo,
    TScroll,
    TText,
    TListBox
} from '../../src/comp';

import styles from '../../src/styles';

import Mask from '../../src/lib/Mask'
import ListBox from '../../src/lib/ListBox'

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            events: '',
            listBox: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        let events = this.state.events + ' ' + JSON.stringify(event);

        this.setState({
            events: events,
            [event.name]: event.value
        });

    }

    render() {

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

                        <Mask
                            vStyle={styles.TComponent.edit}
                            iStyle={styles.TComponent.invalid.edit}
                            name={'mask'}
                            value={this.state.mask}
                            mask={{mask: '+1 (NNN) NNN-NN-NN', empty: '_'}}
                            onValidate={(event) => {
                                return event.full || event.empty;
                            }}
                            placeholder={'Enter single line text ...'}
                            onChange={this.handleChange} />

                        <TText
                            label={'TText component:'}
                            name={'text'}
                            value={this.state.text}
                            mask={{mask: '+1 (NNN) NNN-NN-NN', empty: '_'}}
                            onValidate={(event) => {
                                return event.full || event.empty;
                            }}
                            placeholder={'Enter single line text ...'}
                            onChange={this.handleChange} />

                        <TListBox
                            label={'ListBox:'}
                            name={'listBox'}
                            value={this.state.listBox}
                            items={[
                                {id: 1, name: 'first item'},
                                {id: 2, name: 'second item'}
                            ]}
                            empty={{id: -1, name: '-'}}
                            placeholder={'Enter single line text ...'}
                            onChange={this.handleChange} />

                        <TMemo
                            label={'TMemo component:'}
                            name={'memo'}
//                            value={this.state.memo}
                            placeholder={'Enter single line text ...'}
                            onChange={this.handleChange} />

                    </TGroup>

                    <TGroup label={'Events'} style={{padding: "4px"}}>

                        <TMemo
                            style={{container: {margin: "0", width: "100%", maxWidth: "auto"}, edit: {border: "none"}}}
                            value={this.state.events} />

                    </TGroup>

                </TScroll>

            </div>

        );

    }

}

export default Main;
