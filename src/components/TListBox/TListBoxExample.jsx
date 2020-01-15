import React from 'react';

import {TListBox, TMemo, TGroup} from 'tedit';

class TListBoxExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 2,
            event: ''
        };
        this.change = this.change.bind(this);
        this.clear = this.clear.bind(this);
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

                    <TListBox
                        style={{container: {width: "380px", margin: "8px 0 8px 0"}}}
                        name={'myListBox'}
                        items={[
                            {key: 1, value: 'First item'},
                            {key: 2, value: 'Second item'},
                            {key: 3, value: 'Third item'}
                        ]}
                        value={this.state.value}
                        showMode={'value'}
                        listMode={'key value'}
                        label={'Choose item:'}
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

export default TListBoxExample;