import React from 'react';

import {TIcon, TText, TMemo} from 'tedit';

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            events: '',
            ttext: '00.00.0000',
            tmemo: ''
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

        return (

            <div style={{width: "400px", margin: "auto"}}>

                <TIcon name={'add'} />

                <TText
                    value={this.state.ttext}
                    label={'TText:'}
                    name={'ttext'}
                    data={1}
                    mask={'NN.NN.NNNN'}
                    onValidate={(value) => {return value.length >= 10;}}
//                    onMask={(event) => {return {val: '---', pos: 2};}}
                    onChange={this.handleChange} />

                <TMemo
                    value={this.state.tmemo}
                    label={'TMemo:'}
                    name={'tmemo'}
                    strip={true}
                    data={2}
                    placeholder={'Memo'}
                    onChange={this.handleChange} />

                <TMemo
                    value={this.state.events}
                    label={'Events:'} />

            </div>

        );

    }

}

export default Main;
