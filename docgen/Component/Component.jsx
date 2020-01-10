import React from 'react';
import PropTypes from 'prop-types';

import {getFile, merge} from 'tedit';

import Props from '../Props';

import styles from './styles.js';

const examples = require('examples');

class Component extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            html: null
        }
    }


    componentDidMount() {
        this.mounted = true;
        let name = this.props.data ? this.props.data.displayName : null;
        console.log(JSON.stringify(window.location));
        if (name && this.props.data.example) {
            getFile(window.location.origin + '/components/' + name + '.html', (html) => {
                if (this.mounted && html) {
                    this.setState({html: html});
                }
            });
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        let desc = this.props.data ? this.props.data.description : null;

        let props = null;
        if (this.props.data && this.props.data.props) {
            props = <div>
                <div style={style.props}>{'Props:'}</div>
                <Props data={this.props.data.props} />
            </div>;
        }

        let example = null;
        if (this.props.data.example && this.props.data.example.name) {
            let code = null;
            if (this.state.html) {
                code = <div style={style.code} dangerouslySetInnerHTML={{__html: this.state.html}}></div>;
            }
            example = (
                <div>
                    <div style={style.example}>{'Example:'}</div>
                    {React.createElement(examples[this.props.data.example.name], {}, null)}
                    <div style={style.example}>{'Code sample:'}</div>
                    {code}
                </div>
            );
        }

        return (
            <div>
                <div style={style.desc}>{desc}</div>
                {example}
                {props}
            </div>
        );

    }

}

Component.propTypes = {
    data: PropTypes.object
};

export default Component;