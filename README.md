# tedit

Set of visual React components designed for constructing web application interfaces.

`tedit` provides set of visual components constructed on `<div>` element with editable content:
* [`TText`](#ttext)
* [`TMemo`](#tmemo)
* [`TListBox`](#tlistbox)
* [`TSearch`](#tsearch)

Other components:
* [`TIcon`](#ticon)
* [`TCheck`](#tcheck)
* [`TGroup`](#tgroup)


## Example
[Example page](https://tsvetus.github.io/tedit/)

## Stylization

Every component in `tedit` library has `style` property stands for providing custom style for each component:

```javascript
import {TText} from 'tedit';

const style = {...};
...
    <TText style={style} />
...    
```
 
Each component has it's own style structure described below. In addition one can register global project 
styles using `registerStyles` function as follows:

```javascript
import {registerStyles} from 'tedit';

const styles = {    
    component: {
        /** Global style for all editable components */
        container: {
            backgroundColor: '#eee'
        },
        edit: {
            border: "1px solid red"
        }
    },
    memo: {
        /** Custom style for TMemo component. 
        * Use component name without 't' letter for assigning style to custom component */
        edit: {
            border: "1px solid green"
        }
    }
};

registerStyles(styles);
```
This makes all controls appeared on grey background then all editable controls have `red` border except `green` 
border for `TMemo`.  

## Events

All events are occur with delay determined by `timeout` property. Default timeout is `700 ms`. There are five 
types of events in `tedit` components:  

* `IconClickEvent` - Emerges each time when user click on icon. Applies to `TIcon` component itself and when
    nested icons in `TText` and `TMemo` components are clicked.
  * Argument: `{name: ..., data: ..., icon: ...}` where
    * `name` - component name from `name` property.
    * `data` - any data from `data` property.
    * `icon` - contains icon name.      
* `TexChangeEvent` - Emerges each time when edit text is changed in text edit components. Applies to `TText` 
    and `TMemo` components.
  * Argument: `{value: ..., name: ..., data: ..., icon: ...}` where
    * `value` - edited text.
    * `name` - component name from `name` property.
    * `data` - any data from `data` property.
    * `icon` - contains name of current component depending of it's state.      
* `ListChangeEvent` - Emerges each time when item selected from list in list edit components. Applies to
    `TListBox` and `TSearch` components. 
  * Argument: `{value: ..., name: ..., data: ...}` where
    * `value` - key value of clicked list item.
    * `name` - component name from `name` property.
    * `data` - any data from `data` property      
* `ValidateEvent` - Emerges when text validation is needed. Applies to `TText` and `TMemo` components.
  * Argument: `{value: ..., name: ..., data: ...}` similar to other events.
  * Returns: - `boolean` When event returns `false` the component changes it's style to `invalid` 
      (see style structure). 
* `MaskCheckEvent` - Emerges when text mask checking is needed. Applies to `TText` component when `mask`
    property is empty. If `mask` property contains any available masks `TText` component uses internal formatting 
    engine to mask entered text.
  * Argument: `{value: ..., caret: ...}`
    * `value` - contains current edited text.
    * `caret` - contains current caret position.
  * Returns: - `boolean` The event mast returns the same type of object back `{value: ..., caret: ...}` whith 
      `value` and `caret` containing new values of text and caret position.  

# Component descriptions

## `TText`

`TText` represents one line text editor with label and icon (disabled by default)

### Style structure:

* `container` - Outer component container style.
* `frame` - Style for label, edit and icon box.
* `label` - Component label style.
* `edit` - Text editor style.
* `icon`- Clickable icon style.

### Component properties:

* `style` - Component style.
* `value` - Text to display.
* `name` - Component name. Use `name` property if you have one `onChange` events for multiply components. 
* `data` - Component data. Use `data` property if you want to associate component with some object. 
* `label` - Label text.
* `icon` - Icon name from available icon list (see `TIcon`). If assigned the appropriate icon appeared 
            near text editor. 
* `timeout` - Timeout for `onChange` event. Default: `700 ms`.
* `placeholder` - Placeholder text.
* `mask` - Text mask. Now only text masks like `NN:NN` are supported where `N` is any number. `mask` property 
    represents object of type: `{mask: ..., empty: ..., complete: ...}` where:
  * `mask` - String field of the form `+1 (NNN) NNN-NN-NN` where `N` - any number.
  * `empty` - String represents empty symbol. If `empty` length more tan one symbol only first is used.
  * `complete` - Optional. If true `onChange` event fires only when masked text is fully typed or empty instead.       
* `empty` - Value used by `onChange` event when edit text is empty.

### Component events:

* `onChange`: `TextCengeEvent`
* `onValidate`: `ValidateEvent`  
* `onIcon`: `IconClickEvent`
* `onMask`: `MaskCheckEvent`

### Example:  

```javascript
import React from 'react';

import {
    TIcon,
    TText,
    TMemo,
    TGroup,
    TListBox,
    TCheck,
    TSearch,
    styles,
    registerStyles,
    nvl
} from 'tedit';

registerStyles({

    icon: {
        margin: "4px",
        width: "32px",
        height: "32px"
    },

    component: {

        container: {
            margin: "16px 0 0 0",
            width: "100%"
        },

        invalid: {
            edit: {
                backgroundColor: "#eea"
            }
        },

        icon: {
            width: "18px",
            height: "18px"
        }

    }

});

const iconLabelStyle = {
    ...styles.component.label,
    display: "flex",
    alignItems: "center",
    margin: "8px"
};

const LIST = [
    {id: 1, name: 'first item'},
    {id: 2, name: 'second item'},
    {id: 3, name: 'third item'}
];


class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            events: '',
            ttext: null,
            ttext1: null,
            ttext2: null,
            tmemo: null,
            tcheck: 1,
            tlistbox: null,
            tsearch: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let events = this.state.events + JSON.stringify(event) + ' ';
        this.setState({
            events: events,
            [event.name]: event.value
        });
    }

    render() {

        let icons = [];
        for (let key in TIcon.icons) {
            icons.push(
                <div key={key} style={iconLabelStyle}>
                    {key + ':'}
                    <TIcon
                        name={key}
                        style={styles.icon} />
                </div>);
        }

        return (

            <div style={{maxWidth: "420px", margin: "auto", padding: "8px"}}>

                <TGroup label={'TEdit component examples'}>

                    <TText
                        value={this.state.ttext}
                        label={'TText component:'}
                        name={'ttext'}
                        placeholder={'Enter single line text ...'}
                        onChange={this.handleChange} />

                    <TText
                        value={this.state.ttext1}
                        label={'TText with validation:'}
                        name={'ttext1'}
                        placeholder={'Enter more than 3 symbols ...'}
                        onValidate={(event) => {
                            return nvl(event.value, '').length >= 3;
                        }}
                        onChange={this.handleChange} />

                    <TText
                        value={this.state.ttext2}
                        label={'Enter phone number:'}
                        name={'ttext2'}
                        mask={{mask: '+1 (NNN) NNN-NN-NN', empty: '_', complete: true}}
                        onChange={this.handleChange} />

                    <TListBox
                        name={'tlistbox'}
                        label={'TList box:'}
                        listMode={'key value'}
                        showMode={'value'}
                        empty={{id: null, name: '-'}}
                        value={this.state.tlistbox}
                        items={[
                            {id: 1, name: 'first item'},
                            {id: 2, name: 'second item'}
                        ]}
                        placeholder={'Choose item from list ...'}
                        onChange={this.handleChange} />

                    <TCheck
                        label={'Check me:'}
                        name={'tcheck'}
                        value={this.state.tcheck}
                        checked={1}
                        unchecked={0}
                        onChange={this.handleChange} />

                    <TSearch
                        name={'tsearch'}
                        label={'TSearch:'}
                        listMode={'key value'}
                        showMode={'value'}
                        value={this.state.tsearch}
                        placeholder={'Type word "item"'}
                        onSearch={event => {
                                return LIST.filter(v => {
                                    return v.name.indexOf(nvl(event.value, '')) >= 0 ||
                                        v.id == event.key;
                                });
                            }
                        }
                        onChange={this.handleChange} />

                    <TMemo
                        value={this.state.tmemo}
                        label={'TMemo component:'}
                        name={'tmemo'}
                        data={3}
                        placeholder={'Enter multiline text. Use "wrap" property to enable caret returns.'}
                        onChange={this.handleChange} />

                    <TMemo
                        value={this.state.events}
                        label={'Events:'} />

                </TGroup>

                <TGroup label={'TEdit icon list'}>
                    {icons}
                </TGroup>

            </div>

        );

    }

}

export default Main;

```

