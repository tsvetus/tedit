import React from 'react';
import PropTypes from 'prop-types';

import {TIMEOUT} from 'lib';

/**
 * Text input component.
 * @extends React
 */
class Edit extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.value = props.value;
        this.ref = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getText = this.getText.bind(this);
        this.setText = this.setText.bind(this);
        this.getPos = this.getPos.bind(this);
        this.setPos = this.setPos.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.ref.current.contentEditable = true;
        this.ref.current.addEventListener('input', this.handleChange);
        this.ref.current.addEventListener('keypress', this.handleKeyPress);
        this.ref.current.addEventListener('click', this.handleClick);
        this.setText(this.value);
        this.handleChange();
    }

    componentWillUnmount() {
        this.ref.current.contentEditable = false;
        this.ref.current.removeEventListener('click', this.handleClick);
        this.ref.current.removeEventListener('keypress', this.handleKeyPress);
        this.ref.current.removeEventListener('input', this.handleChange);
        this.mounted = false;
    }

    componentDidUpdate() {
        if (this.value !== this.props.value) {
            this.value = this.props.value;
            this.setText(this.value);
            this.handleChange();
        }
    }

    getText() {
        let text = this.ref.current.innerText;
        if (this.props.strip) {
//            return text.replace(/<[^>]*>?/gm, ' ');
            return text.replace(/\r?\n|\r/gm, ' ');
        } else {
            return text;
        }
    }

    setText(text) {
        this.ref.current.innerText = text;
    }

    getPos() {
        if (this.ref.current === document.activeElement) {
            let _range = document.getSelection().getRangeAt(0);
            let range = _range.cloneRange();
            range.selectNodeContents(this.ref.current);
            range.setEnd(_range.endContainer, _range.endOffset);
            return range.toString().length;
        } else {
            return 0;
        }
    }

    setPos(pos) {
        if (this.ref.current === document.activeElement) {
            let position = pos;
            if (this.getText().length < pos) {
                position = this.getText().length;
            }
            document.getSelection().collapse(this.ref.current.firstChild, position);
        }
    }

    handleChange() {

        if (this.props.onMask) {
            let result = this.props.onMask({val: this.getText(), pos: this.getPos()});
            if (result && !isNaN(result.pos)) {
                this.setText(result.val);
                this.setPos(result.pos);
            }
        }

        if (this.props.onChange) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if (this.mounted && this.value !== this.getText()) {
                    this.value = this.getText();
                    this.props.onChange({
                        data: this.props.data,
                        name: this.props.name,
                        value: this.value
                    });
                }
            }, this.props.timeout);
        }

    }

    handleKeyPress(event) {
        if (!this.props.wrap && event.keyCode === 13) {
            event.preventDefault();
        }
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick({
                data: this.props.data,
                name: this.props.name,
                value: this.getText()
            });
        }
    }

    render () {

        let style = this.props.style;

        return (
            <div style={style} ref={this.ref} />
        );

    }

}

Edit.propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    wrap: PropTypes.any,
    strip: PropTypes.any,
    placeholder: PropTypes.string,
    timeout: PropTypes.number,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onMask: PropTypes.func
};

Edit.defaultProps = {
    timeout: TIMEOUT
};

export default Edit;
