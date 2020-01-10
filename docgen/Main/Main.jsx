import React from 'react';
import PropTypes from 'prop-types';
import {
    TTop,
    TSide,
    TPanel,
    TScroll,
    merge
} from 'tedit';

import {getFile} from 'tedit';

import Component from '../Component';

import styles from './styles';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            menu: false,
            page: 'readme',
            caption: ''
        };
        this.menuToggle = this.menuToggle.bind(this);
        this.menuClick = this.menuClick.bind(this);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        getFile('/tedit/' + this.props.fileName, (json) => {
            if (this.mounted && json) {
                this.setState({data: JSON.parse(json), page: 'TDate'});
            }
        });
    }

    menuToggle() {
        this.setState({menu: !this.state.menu});
    }

    menuClick(event) {
        if (event.item.name === 'close') {
            this.setState({menu: false});
        } else {
            this.setState({
                menu: false,
                page: event.item.name,
                caption: event.item.name
            });
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        let caption = this.state.data && this.state.data.title ? this.state.data.title.caption : null;
        let component = null;
        if (this.state.page === 'readme') {
            // if (this.state.data && this.state.data.title) {
            //     description = this.state.data.title.caption;
            // }
        } else {
            let comp = this.state.data.components[this.state.page];
            component = <Component data={comp} />;
        }

        let items = [{
            name: 'readme',
            caption: 'Description'
        }];
        if (this.state.data && this.state.data.components) {
            for (let key in this.state.data.components) {
                items.push({
                    name: this.state.data.components[key].displayName,
                    caption: this.state.data.components[key].displayName,
                });
            }
        }

        return (

            <div>

                <TSide
                    onClick={this.menuClick}
                    show={this.state.menu}
                    items={items} />

                <TTop
                    style={style.top}
                    caption={caption}
                    onClick={this.menuToggle} />

                <TPanel style={style.panel}>
                    {this.state.caption}
                </TPanel>

                <TScroll style={style.scroll}>
                    {component}
                </TScroll>

            </div>
        );

    }

}

Main.propTypes = {
    fileName: PropTypes.string
};

Main.defaultProps = {
    fileName: 'index.json'
};

export default Main;