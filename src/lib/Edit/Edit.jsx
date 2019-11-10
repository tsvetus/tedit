import React from 'react';
import PropTypes from 'prop-types';

import {TIMEOUT, nvl} from '../../util';

/**
 * @class
 * @ignores
 */
class Edit extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.value = nvl(props.value, '');
        this.ref = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getHtml = this.getHtml.bind(this);
        this.setHtml = this.setHtml.bind(this);
        this.getText = this.getText.bind(this);
        this.setText = this.setText.bind(this);
        this.getPos = this.getPos.bind(this);
        this.setPos = this.setPos.bind(this);
        this.showPlaceholder = this.showPlaceholder.bind(this);
        this.hidePlaceholder = this.hidePlaceholder.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.enableEdit(!this.props.readOnly);
        this.ref.current.addEventListener('input', this.handleChange);
        this.ref.current.addEventListener('keypress', this.handleKeyPress);
        this.ref.current.addEventListener('click', this.handleClick);
        this.ref.current.addEventListener('focus', this.handleFocus);
        this.ref.current.addEventListener('blur', this.handleBlur);
        this.setText(this.value);
        this.handleChange();
        this.showPlaceholder();
    }

    componentWillUnmount() {
        this.enableEdit(false);
        this.ref.current.removeEventListener('blur', this.handleBlur);
        this.ref.current.removeEventListener('focus', this.handleFocus);
        this.ref.current.removeEventListener('click', this.handleClick);
        this.ref.current.removeEventListener('keypress', this.handleKeyPress);
        this.ref.current.removeEventListener('input', this.handleChange);
        this.mounted = false;
    }

    componentDidUpdate(old) {

        if (this.value !== nvl(this.props.value, '')) {
            this.value = nvl(this.props.value, '');
            this.setText(this.value);
            this.handleChange();
            this.showPlaceholder();
        }

        if (old.readOnly !== this.props.readOnly) {
            this.enableEdit(!this.props.readOnly);
        }

    }

    enableEdit(enabled) {
        this.ref.current.contentEditable = enabled;
    }

    showPlaceholder() {
        if (this.props.placeholder && this.getText() === '' && this.getHtml().indexOf('<span') < 0) {
            this.setHtml('<span style="pointer-events: none; color: #aaa;">' +
                this.props.placeholder + '</span>');
        }
    }

    hidePlaceholder() {
        let html = this.getHtml();
        if (html.indexOf('<span') >= 0) {
            this.setHtml(html.replace(/<span.*<\/span>/, ''));
        }
    }

    getHtml() {
        return this.ref.current.innerHTML;
    }

    setHtml(html) {
        this.mute = true;
        try {
            this.ref.current.innerHTML = html;
        } finally {
            this.mute = false;
        }
    }

    getText() {
        if (this.getHtml().indexOf('<span') < 0) {
            let text = this.ref.current.innerText;
            if (!this.props.wrap) {
                return text
                    .replace(/[\r\n]+$/, '')
                    .replace(/[\r\n]+/gm, ' ');
            } else {
                return text;
            }
        } else {
            return '';
        }
    }

    setText(text) {
        this.ref.current.innerText = nvl(text,'');
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
            let len = this.getText().length;
            if (pos > len) {
                document.getSelection().collapse(this.ref.current.firstChild, len);
            } else {
                document.getSelection().collapse(this.ref.current.firstChild, pos);
            }
        }
    }

    handleChange() {

        if (this.mute) {
            return;
        }

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

    handleFocus() {
        this.hidePlaceholder();
    }

    handleBlur() {
        this.showPlaceholder();
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
    placeholder: PropTypes.string,
    timeout: PropTypes.number,
    readOnly: PropTypes.any,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onMask: PropTypes.func
};

Edit.defaultProps = {
    readOnly: false,
    wrap: false,
    timeout: TIMEOUT
};

export default Edit;
