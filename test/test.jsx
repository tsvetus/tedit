import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Main';

import {registerStyles} from 'tedit';

registerStyles({

    component: {

        container: {
            marginTop: "16px"
        },

        edit: {
        },

        invalid: {
            edit: {
                backgroundColor: "#ea9"
            }
        }

    },

    tmemo: {
        edit: {
        }
    }

});

ReactDOM.render(
    <Main />,
    document.getElementById ('root')
);
