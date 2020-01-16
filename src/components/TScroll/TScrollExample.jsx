import React from 'react';

import {TScroll, TGroup} from 'tedit';

class TGroupExample extends React.Component {

    render () {

        return (

            <div>

                <TGroup style={{container: {margin: "0 0 16px 0"}}}>

                    <TScroll
                        style={{
                            container: {height: "300px", width: "100%"},
                            content: {padding: "16px"}
                        }} >

                        <TGroup
                            style={{
                                container: {marginTop: "16px"},
                                content: {
                                    minHeight: "200px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around"
                                }
                            }}
                            label={'Group 1'}>
                            <div>Group 1 content</div>
                            <div>Group 1 content</div>
                        </TGroup>

                        <TGroup
                            style={{
                                container: {marginTop: "16px"},
                                content: {
                                    minHeight: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around"
                                }
                            }}
                            label={'Group 2'}>
                            <div>Group 2 content</div>
                            <div>Group 2 content</div>
                        </TGroup>

                    </TScroll>

                </TGroup>

            </div>

        );

    }

}

export default TGroupExample;