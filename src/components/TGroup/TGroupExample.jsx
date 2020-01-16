import React from 'react';

import {TGroup} from 'tedit';

class TGroupExample extends React.Component {

    render () {

        return (

            <div>

                <TGroup style={{container: {margin: "0 0 16px 0"}}}>

                    <TGroup
                        style={{
                            container: {width: "300px"},
                            content: {display: "flex", flexDirection: "row"}
                        }}
                        label={'Group 1'}>
                        <div>Group 1 content</div>
                        <div>Group 1 content</div>
                    </TGroup>

                    <TGroup
                        style={{
                            container: {width: "300px"},
                            content: {display: "flex", flexDirection: "column"}
                        }}
                        label={'Group 2'}>
                        <div>Group 2 content</div>
                        <div>Group 2 content</div>
                    </TGroup>

                </TGroup>

            </div>

        );

    }

}

export default TGroupExample;