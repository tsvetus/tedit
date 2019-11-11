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


## Example
[Example page](https://tsvetus.github.io/tedit/)

## Stylization

Every component in `tedit` library has `style` property stands for providing custom style for each component:

````javascript
import {TText} from 'tedit';

const style = {...};

...

    render() {
        return (
            <TText style={style} />
        )
    }
    
...    
````
 
Each component has it's own style structure described below. In addition one can register global project 
styles using `registerStyles` function as follows:

````javascript
import {registerStyles} from 'tedit';

const styles = {    
    component: {
        /* Global style for all components */
        container: {
            backgroundColor: '#eee'
        },
        edit: {
            border: "1px solid red"
        }
    },
    tmemo: {
        /* Custom style for TMemo component */
        edit: {
            border: "1px solid green"
        }
    }
};

registerStyles(styles);
````
This makes all controls appeared on grey background then all editable controls have `red` border except `green` 
border for `TMemo`.  

## Events

All events are occur with delay determined by `timeout` property. Default timeout is `700 ms`. There are three 
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

Style structure:

* `container` - Outer component container style.
* `frame` - Style for label, edit and icon box.
* `label` - Component label style.
* `edit` - Text editor style.
* `icon`- Clickable icon style.

Component properties:

* `style` - Component style.
* `value` - Text to display.
* `name` - Component name. Use `name` property if you have one `onChange` events for multiply components. 
* `data` - Component data. Use `data` property if you want to associate component with some object. 
* `label` - Label text.
* `icon` - Icon name from available icon list (see `TIcon`). If assigned the appropriate icon appeared 
            near text editor. 
* `timeout` - Timeout for `onChange` event. Default: `700 ms`.
* `placeholder` - Placeholder text.
* `mask` - Text mask. Now only text masks like `NN:NN` are supported where `N` is any number.
* `empty` - Value returned by `onChange` event when edit text is empty.

Component events:

* `onChange`: `TextCengeEvent`
* `onValidate`: `ValidateEvent`  
* `onIcon`: `IconClickEvent`
* `onMask`: `MaskCheckEvent`  

````javascript
style = {
    /* Global component container */
    container: {},
    /* Frame for label edit and icon */
    label: {},
    /* Component label */
    frame: {},
    /* Component edit field */
    edit: {},
    /* Component icon (disabled by default) */
    icon: {},
    invalid: {
        /* The same as upper level but stands for signal invalid state */
        container: {},
        frame: {},
        label: {},
        edit: {},
        icon: {}
    }
}
````

* [`TListBox`](#tlistbox) [`TSearch`](#tsearch):

````javascript
style = {
    /* Global component container */
    container: {},
    /* Frame for label edit and icon */
    label: {},
    /* Component label */
    frame: {},
    /* Component edit field */
    edit: {},
    /* Component icon (disabled by default) */
    icon: {},
    /* Styles for item list */
    list: {},
    /* Style for each item in list */
    item: {},
    /* Style for selected item in list */
    selected: {},
    invalid: {
        /* The same as upper level but stands for signal invalid state */
        container: {},
        frame: {},
        label: {},
        edit: {},
        icon: {}
    }
}
````

* [`TIcon`](#ticon):

````javascript
style = {
    /* Plain object. Has no children */
}
````

* [`TCheck`](#tcheck):

````javascript
style = {
    /* Global component container */
    container: {},
    /* Frame for label edit and icon */
    label: {},
    /* Component label */
    frame: {},
    /* Component edit field */
    icon: {},
    invalid: {
        /* The same as upper level but stands for signal invalid state */
        container: {},
        frame: {},
        label: {},
        icon: {}
    }
}
````



````javascript
import {registerStyles} from 'tedit';

const myStyles = {
    component: {
        /* Style for all editable components */
        edit: {
            border: "1px solid red"
        }
    },
    tmemo: {
        /* Custom style for TMemo component */
        edit: {
            border: "1px solid green"
        }
    }
}

registerStyles(myStyles);
````
This makes all editable controls in library have `red` border except `TMemo`  

* `container` - Style for outer box

* `label` - Style for label

* `edit` - Style for edit

Specific for `TSearch` and `TSearch` components:

* `list` - Style for drop down itemslist

* `item` - Style for item in drop down list

All root style properties will be copied to `container` property automatically.

### Example

```javascript
const customStyle = {

    container: {
        border: "none"
    },

    label: {
        color: "#f33"
    },

    edit: {
        color: "#000",
        borderBottom: "2px solid #ddd"
    },

    list: {
        border: "2px solid #f33",
        backgroundColor: "#eee"
    },

    item: {
        border: "none"
    }

}
```

## Events

`onChange = function(event)` - On change event where `event` contains:

* `event.value` - Component value.

* `event.name` - Value of `name` property. Type `String`.

* `event.data` - Value of `data`property. Type `Object`.

* `event.caption` - Value of item name for components with dropdown list.
    Type `String`.

`onSearch = function(query, callback = function(items))` - When component dropdown
    list needs to be updated it calls `onSearch` to find suitable items (in
    external database for instance) with parameters:
*   `query.id` - Find using `id` value
*   `query.name` - Find using `name` value          
*   `callback` - Function accepts array of found `items` of form:
    `[{id: <id value>, name: <name value>}, ...]`  

## `TMemo`

Component `TMemo` represents text input element and contains properties:

* `style` - Style for custom stylization

* `name` - Any usable name for component. It will be returned back to parent component
         with `onChange` event

* `data` - Any usable object containing data that will be returned back to parent component
         with `onChange` event

* `label` - Name for label. If not specified - no label will be displayed

* `placeholder` - TMemo for empty input

* `password` - Optional. If specified - entered text appears as dots    

* `value` - Default display text

* `onChange` - On change event. `event.value` contains last changed text.

```javascript
<TMemo
    style={{container: {border: "1px solid red"}}}
    name="MyTextInput"
    data={{id: 123}}
    label="TMemo:"
    placeholder="Enter your text"
    onChange={this.handleChange} />
```   

## `TSearch`

Component `TSearch` represents input with dropdown list of items:

* `style`, `name`, `data`, `label`, `placeholder` - Same as in <TMemo> component.

* `list` - Array of items in dropdown list. Example: `list={[{id: 1, name: "first item"}, {id: 2, name: "second item"}]}`.
        Format of single item is: `{id: 1, name: "first item"}` where `id` is used for value field in `onChange` event and
        `name` - text displayed in input field and dropdown list items.  

* `empty` - Optional. Defines an empty list item. Example: `empty={{id: 0, name: "-"}}`. If specified this item appears
        at first position in dropdown list. If chosen - `onChange` event returns value specified in `id`
        field of `empty` object.         

* `value` - Value of default `id` displayed after component did mount.        

* `onChange` - On change event. Fires only if dropdown list item clicked. Returns object:
        `{value: 1, caption: "Item name", name: "MyListBox", data: {}}` where `value` - `id` of chosen item,
        `caption` - it's `name`, `name` - component name and `data` - component data property.    


### Example

```javascript
<TSearch
    style={{container: {border: "1px solid red"}}}
    name="MyListbox"
    label="Item:"
    value={1}
    placeholder="Choose item"
    items={[
        {id: 1, name: "First item"},
        {id: 2, name: "Second item"}
    ]}
    empty={{id: 0, name: "-"}}
    onChange={this.handleChange} />
```   

## `TSearch`

Component `TSearch` similar to `TSearch` but dropdown list appears automatically while user enters a text:

* `style`, `name`, `data`, `label`, `placeholder` - Same as in <TMemo> component.

* `value` - Value of default `id` displayed after component did mount.        

* `onChange` - On change event. Fires only if dropdown list item clicked. Returns object:
        `{value: 1, caption: "Item name", name: "MyListBox", data: {}}` where `value` - `id` of chosen item,
        `caption` - it's `name`, `name` - component name and `data` - component data property.

* `onSearch` - When component dropdown list needs to be updated it calls `onSearch` with object parameters:
    *    `{id: <any id>}` or `{name: <any substring>}` - Search parameters. Parent component performs search using values from `id` or `name` field
        trying to find suitable items (from external database for instance)           
    *   `function()` - Callback function returning array of items like: `[{id: 1, name: "first item"}, {id: 2, name: "second item"}]`          

### Example

```javascript
<TSearch
    style={{container: {border: "1px solid red"}}}
    name="MySearch"
    label="TSearch:"
    placeholder="Enter text 'item'"
    onSearch={this.handleSearch}
    onChange={this.handleChange} />
```   

## `TMask`

Component `TMask` represents component with masked text input:

* `style`, `name`, `data`, `label` - Same as in <TMemo> component.

* `mask` - Object contains mask parameters. Example: `mask={mask: "NN.NN.NNNN", empty: "-"}`. `N` - means any number.  

* `onChange` - On change event. Fires only if value does not contains an empty chars.    

### Example

```javascript
<TMask
    style={{container: {border: "1px solid red"}}}
    name="MyDate"
    label="Date:"
    value="22.04.2019"
    mask={{mask: "NN.NN.NNNN", empty: "-"}}
    onChange={this.handleChange} />
```   

## `TDate`

Component `TDate` represents date input:

* `style`, `name`, `data`, `label` - Same as in <TMemo> component.

* `format` - Object contains date format. Example: `format={mask: "DD.MM.YYYY", empty: "-"}`.

* `value` - Contains default date value. Value can be `Date` type or date string in `ISO` format `YYYY-MM-DD`.   

* `onChange` - On change event. Fires only if value does not contains an empty chars.
             Parameter `event.value` contains date string in `ISO` format   

### Example

```javascript
<TDate
    style={{container: {border: "1px solid red"}}}
    name="MyDate"
    label="Date:"
    value={new Date()}
    format={{mask: "DD.MM.YYYY", empty: "-"}} />
```   

## `TTime`

Component `TTime` represents time input:

* `style`, `name`, `data`, `label` - Same as in <TMemo> component.

* `format` - Object contains time format. Example: `format={mask: "hh:mm:ss", empty: "-"}`.

* `value` - Contains default time value. Value can be `Date` type or time string in `ISO` format `hh:mm:ss`.   

* `onChange` - On change event. Fires only if value does not contains an empty chars.
             Parameter `event.value` contains time string in `ISO` format   

### Example

```javascript
<TTime
    style={{container: {border: "1px solid red"}}}
    name="MyTime"
    label="Time:"
    value={new Date()}
    format={{mask: "hh:mm", empty: "-"}}
    onChange={this.handleChange} />
```  

## `TMail`

Component `TMail` represents input for email:

* `style`, `name`, `data`, `label` - Same as in <TMemo> component.

* `value` - Contains default email value.   

* `onChange` - On change event. Fires only if value matches email format.

### Example

```javascript
<TMail
    style={{container: {border: "1px solid red"}}}
    name="MyMail"
    label="Email:"
    placeholder="Enter email"
    onChange={this.handleChange} />
```  
## `TGroup`

Component `TGroup` extends html <textarea> tag:

* `style`, `name`, `data`, `label` - Same as in <TMemo> component.

* `value` - Contains default text.   

* `onChange` - On change event..

### Example

```javascript
<TGroup
    style={{container: {border: "1px solid red"}}}
    name="MyMemo"
    label="Textarea:"
    onChange={this.handleChange} />
```  

## `TCheck`

Component `TGroup` extends html <textarea> tag:

* `style`, `name`, `data`, `label` - Same as in <TMemo> component.

* `value` - Contains default state `true`, `false`, `0` or `1`.   

* `valueInt` - If `true` then return value is `0` or `1`.

* `onChange` - On change event.

### Example

```javascript
<TCheck
    style={{container: {border: "1px solid red"}}}
    name="MyCheck"
    label="Check me"
    value={1}
    nalueint={true}
    onChange={this.handleChange} />
```  

## `TTop`

Component `TTop` represents top menu with mail menu button in top left corner:

* `onClick` - executes when menu button clicked.

### Example

```javascript
<TTop
    onClick={this.handleTopClick} />
```  

## `TSide`

Component `TSide` represents left sided slide menu:

* `open` - When `true` - side menu is open.

* `items` - Array of menu items of type: `{name: <item name>, caption: <item caption>}`.

* `width` - Opened menu witdh. Default: `300px`.

* `touchWidth` - Minimum touch move length before side menu will open or close.

* `initWidth` - Sensible area width from left screen side.

* `onClick` - Executes when menu closed or menu item clicked. Event: `{name: <clicked item name>}`.

### Example

```javascript
<TSide
    onClick={this.handleSideClick}
    open={this.state.menuOpen}
    width={"400px"}
    touchWidth={20}
    initWidth={"10px"}
    items={[
        {name: "first", caption: "First menu item"},
        {name: "second", caption: "Second menu item"}
    ]} />
```  

## `TScroll`

Component `TScroll` represents scroll box:

* `style` - Component style. If does' not contain `height` property then
component height will be calculated to fit page height.

* `scrollBars` - Defines scroll bars to show `horizontal`, `vertical`, `both` (default) or `none`.

* `overflow` - If `auto` then scroll bars visible when needed. If `scroll` - always visible.

* `margin` - Additional margin assigned to prevent showing body scroll bar in some browsers.

### Example

```javascript
<TScroll>
    <div>Scrolling content</div>
</TScroll>
```  

## Usage

```javascript

import React from 'react';

import {

    TTop,
    TSide,

    TSearch,
    TMemo,
    TSearch,
    TMask,
    TDate,
    TTime,
    TMail,
    TGroup,
    TCheck,

    TScroll,

    COLOR,
    TABLE,
    FONT

} from 'tinput';

const list = [
    {id: 1, name: "First item"},
    {id: 2, name: "Second item"},
    {id: 3, name: "Third item"},
    {id: 4, name: "Forth item"}
];

const inputStyle = {

    container: {
    },

    label: {
    },

    edit: {
    },

    list: {
    },

    item: {
    }

}

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            events: [],
            menuOpen: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTopClick = this.handleTopClick.bind(this);
        this.handleSideClick = this.handleSideClick.bind(this);
    }

    handleChange(event) {
        let e = this.state.events.slice();
        e.unshift(event);
        this.setState({events: e});
    }

    handleSearch(query, callback) {
        let items = list.filter((v, i) => {
            return ((query.id && query.id == v.id) ||
                (query.name && v.name.toLowerCase()
                    .indexOf(query.name.toLowerCase()) >= 0));
        });
        callback(items);
    }

    handleTopClick(event) {
        this.setState({menuOpen: true});
        this.handleChange(event);
    }

    handleSideClick(event) {
        this.setState({menuOpen: false});
        this.handleChange(event);
    }

    render() {

        let events = [];
        this.state.events.forEach((v, i) => {
            events.push(
                <div key={i} style={{margin: "8px 0 0 0"}}>
                    {JSON.stringify(v)}
                </div>);
        });

        return (

            <div style={{width: "320px"}}>

                <TTop onClick={this.handleTopClick} />

                <TSide
                    onClick={this.handleSideClick}
                    open={this.state.menuOpen}
                    items={[
                        {name: "first", caption: "First menu item"},
                        {name: "second", caption: "Second menu item"}
                    ]} />

                <TMemo
                    style={inputStyle}
                    name="text"
                    label="Text:"
                    placeholder="Enter text"
                    value="default text"
                    onChange={this.handleChange} />

                <TMemo
                    style={inputStyle}
                    name="password"
                    label="Password:"
                    placeholder="Enter password"
                    onChange={this.handleChange}
                    password={true} />

                <TSearch
                    style={inputStyle}
                    name="listbox"
                    label="Item:"
                    value={1}
                    placeholder="Choose item"
                    items={[
                        {id: 1, name: "First item"},
                        {id: 2, name: "Second item"}
                    ]}
                    empty={{id: 0, name: "-"}}
                    onChange={this.handleChange} />

                <TSearch
                    style={inputStyle}
                    name="search"
                    label="Search:"
                    placeholder="Enter text 'item'"
                    value={1}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange} />

                <TMask
                    style={inputStyle}
                    name="dateMask"
                    label="Masked date:"
                    value="22.04.2019"
                    mask={{mask: "NN.NN.NNNN", empty: "-"}}
                    onChange={this.handleChange} />

                <TDate
                    style={inputStyle}
                    name="date"
                    label="Date:"
                    format={{mask: "DD.MM.YYYY", empty: "-"}}
                    onChange={this.handleChange} />

                <TTime
                    style={inputStyle}
                    name="time"
                    label="Time:"
                    format={{mask: "hh:mm", empty: "-"}}
                    onChange={this.handleChange} />

                <TMail
                    style={inputStyle}
                    name="email"
                    label="EMail:"
                    value="google@google.com"
                    onChange={this.handleChange} />

                <TCheck
                    style={inputStyle}
                    name="checkbox"
                    label="Check me:"
                    value={true}
                    valueInt={true}
                    onChange={this.handleChange} />

                <TGroup
                    style={{margin: "16px 0 0 0", height: "100px"}}
                    name="memo"
                    label="Textarea:"
                    value="Text"
                    onChange={this.handleChange} />

                <div style={{
                        color: COLOR.BORDER,
                        fontFamily: FONT.LABEL.FAMILY,
                        fontSize: FONT.LABEL.SIZE,
                        margin: "16px 0 0 0"
                    }}>
                    On change event:
                </div>

                <div style={{
                        minHeight: "100px",
                        ...TABLE.CELL
                    }}>
                    {events}
                </div>

                <TScroll style={{height: "100px", width: "100%", margin: "16px 4px 4px 4px"}}>
                    <div>
                        Tears glistened in her eyes. And when we steamed slowly out of the lagoon,
                        making our way gingerly through the opening in the reef, and then steered
                        for the open sea, a certain melancholy fell upon me. The breeze was laden
                        still with the pleasant odours of the land. Tahiti is very far away, and I
                        knew that I should never see it again. A chapter of my life was closed,
                        and I felt a little nearer to inevitable death.
                    </div>
                </TScroll>                

            </div>

        );

    }

}

export default Main;

```
