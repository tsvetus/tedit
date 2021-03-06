import React from 'react';

import {TCheck, TGroup, TMemo} from 'tedit';

class TCheckExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
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

                    <TCheck
                        style={{container: {width: "120px"}}}
                        label={'Check me:'}
                        value={this.state.value}
                        checked={1}
                        unchecked={0}
                        onChange={this.change} />

                </TGroup>

                <TMemo
                    style={{edit: {minHeight: "48px"}}}
                    label={'onChange events:'}
                    icon={'refresh'}
                    wrap={true}
                    value={this.state.event}
                    onIcon={this.clear} />

            </div>

        );

    }

}

export default TCheckExample;