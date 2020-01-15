import React from 'react';

import {TSearch, TMemo, TGroup, TListBox} from 'tedit';

const ITEMS = [
    {key: 1, value: 'First item'},
    {key: 2, value: 'Second item'},
    {key: 3, value: 'Third item'},
    {key: 4, value: 'Forth item'}
];

class TSearchExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            event: ''
        };
        this.change = this.change.bind(this);
        this.clear = this.clear.bind(this);
        this.search = this.search.bind(this);
    }

    search(event, callback) {
        let items = ITEMS.filter(v => {
            return v.value.indexOf(event.value) >= 0 || v.key == event.key;
        });
        setTimeout(() => {
            callback(items);
        }, 500);
    }

    change(event) {
        this.setState({
            value: event.value,
            event: this.state.event + ' ' + JSON.stringify(event)
        });
    }

    clear() {
        this.setState({event: null});
    }

    render () {

        return (

            <div>

                <TGroup style={{container: {margin: "0 0 16px 0"}}}>

                    <TSearch
                        style={{container: {width: "380px", margin: "8px 0 8px 0"}}}
                        name={'mySearch'}
                        value={this.state.value}
                        label={'Choose item:'}
                        placeholder={'Type word "item"'}
                        empty={{key: 0, value: '-'}}
                        onSearch={this.search}
                        onChange={this.change} />

                </TGroup>

                <TMemo
                    style={{edit: {minHeight: "48px"}}}
                    label={'onChange events:'}
                    icon={'refresh'}
                    value={this.state.event}
                    onIcon={this.clear} />

            </div>

        );

    }

}

export default TSearchExample;