import React from 'react';
import PropTypes from 'prop-types';

import {merge, strDate} from '../../util';

import styles from '../../styles';

class TGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.index
        };
        this.scroll = this.scroll.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.scroll(0);
    }

    componentDidUpdate(old) {
        if (old.index !== this.props.index || old.items !== this.props.items) {
            this.scroll(this.props.index);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    scroll(index) {
        if (this.mounted) {
            let newIndex = (index === null || index === undefined) ? -1 : index;
            if (this.props.items) {
                if (newIndex < 0 || newIndex >= this.props.items.length) {
                    newIndex = 0;
                }
            } else {
                newIndex = -1;
            }
            this.setState({index: newIndex});
            if (this.props.onChange) {
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    index: newIndex
                });
            }
        }
    }

    handleClick(event) {
        let index = Number(event.currentTarget.getAttribute('data'));
        this.scroll(index);
    }

    render () {

        let columns = {row: {gridTemplateColumns: this.props.columns}};

        let style = merge(
            styles.TGrid,
            styles[this.props.name],
            columns,
            this.props.style
        );

        let body = null;
        // if (this.props.items) {
        //     let items = this.props.items.map((v, i) => {
        //         let cs = i === this.state.index ? merge(style.cell, style.current) : style.cell;
        //         return (
        //             <div key={i} style={style.row} data={i} onClick={this.handleClick}>
        //                 <div style={cs}>{strDate(v.date)}</div>
        //                 <div style={cs}>{v.contract}</div>
        //             </div>
        //         );
        //     });
        //     body = (
        //         <div style={style.body}>
        //             {items}
        //         </div>
        //     );
        // }

        let head = null;
        // if (this.props.captions) {
        //     let captions = this.props.captions.map((v, i) => {
        //         <div key={i} style={style.cap}>{v}</div>
        //     });
        //     head = (
        //         <div style={style.head}>
        //             <div style={style.row}>
        //                 {captions}
        //             </div>
        //         </div>
        //     );
        // }

        let rowStyle = style.row;

        if (this.props.columns) {

            let captions = [];
            let widths = '';

            for (let key in this.props.columns) {
                let column = this.props.columns[key];
                captions.push(
                    <div key={key} style={style.cap}>{column.caption ? column.caption : ''}</div>
                );
                widths += ' ' + (column.width ? column.width : '1fr');
            }

            rowStyle = merge(rowStyle, {gridTemplateColumns: widths});

            head = (
                <div style={style.head}>
                    <div style={rowStyle}>
                        {captions}
                    </div>
                </div>
            );

        }

        if (this.props.items && this.props.columns) {

            let items = [];

            this.props.items.forEach((v, i) => {
                let cs = i === this.state.index ? merge(style.cell, style.current) : style.cell;
                let row = [];
                for (let key in this.props.columns) {
                    if (v[key] === undefined) {
                        row.push(
                            <div style={cs} key={key}></div>
                        );
                    } else {
                        row.push(
                            <div style={cs} key={key}>{v[key]}</div>
                        );
                    }
                }
                items.push(
                    <div key={i} style={rowStyle} data={i} onClick={this.handleClick}>
                        {row}
                    </div>
                );
            });

            body = (
                <div style={style.body}>
                    {items}
                </div>
            );

        }

        return (
            <div style={style.container}>
                {head}
                {body}
            </div>
        );

    }

}

TGrid.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    items: PropTypes.string,
    columns: PropTypes.string,
    captions: PropTypes.array,
    index: PropTypes.number,
    onChange: PropTypes.func
};

export default TGrid;
