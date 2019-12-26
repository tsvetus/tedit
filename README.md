# tedit

Set of visual React components designed for constructing web application interfaces.

`tedit` provides set of visual components constructed on `<div>` element with editable content:
* [`TText`](#ttext)
* [`TMemo`](#tmemo)
* [`TListBox`](#tlistbox)
* [`TSearch`](#tsearch)
* [`TDate`](#tdate)
* [`TTime`](#ttime)

No text editor components:
* [`TCheck`](#tcheck)

Buttons and icons:
* [`TButton`](#tbutton)
* [`TIcon`](#ticon)

Grids and lists:
* [`TGrid`](#tgrid)
* [`TFilm`](#tfilm)

Control organizers:
* [`TGroup`](#tgroup)
* [`TPanel`](#tcheck)
* [`TScroll`](#tscroll)
* [`TPager`](#tpager)

Menus:
* [`TTop`](#tgroup)
* [`TSide`](#tgroup)

Modals:
* [`TModal`](#tgroup)
* [`TForm`](#tgroup)

## Example
[Example page](https://tsvetus.github.io/tedit/)

## Stylization

Every component in `tedit` library has `style` property stands for providing custom style for each component:

```javascript
import React from 'react';
import {TText} from 'tedit';

const style = {container: {border: "1px solid red"}, label: {width: "100px"}};

class MyComponent extends React.Component {
    render () {
         return <TText style={style} label={'TText component:'} />   
    }   
}

export default MyComponent;
```
 
Each component has it's own style structure described below. Some components like [TButton](#tbutton) for instance 
has plain style structure. In addition one can register global project styles using `registerStyles` function as follows: 

```javascript
import {registerStyles} from 'tedit';

const styles = {    
    TComponent: {
        /** Global style for components: TText, TListBox, TMemo, TCheck, TGroup e.t.c. */
        container: {
            backgroundColor: '#eee'
        },
        edit: {
            border: "1px solid red"
        }
    },
    TMemo: {
        /** Custom style for TMemo component. */
        edit: {
            border: "1px solid green"
        }
    },
    MyListBox: {
        /** Custom style for component with 'name' property equals to 'MyListBox' */
        list: {
            item: {
                backgroundColor: "yellow"
            }
        }    
    }
};

const templates = {
    /** Global color pallet */
    colors: {
        window: "#ddd",
        frame: "rgba(60,59,194,0.48)",
    }
};

registerStyles(styles, templates);
```
New `styles` make all controls appeared on grey background then all editable controls have `red` border except `green` 
border for `TMemo` and with yellow list items in `TListBox` component with `name="MyListBox"`. New `templates` change
global component background color to `#ddd` and frame border to `rgba(60,59,194,0.48)`.      

## Properties

Each component has it's own set of properties. The whole list of `tedit` component properties listed below:

* `style` - `Object` containing component styles organized in hierarchical structure. If assigned component 
  merges supplied styles with internal styles. Styles assigned to `style` property has highest priority than 
  any other component styles. Default value is `undefined`.
* `name` - `String` containing component name. If assigned any component events return back `name` value in 
  `event` object. In addition `name` value may be used in global styles registered by `registerStyles` function to
  assign to this component individual style. This style has higher priority than internal styles but lower priority
  than style assigned to `style` property. Default value is `undefined`.
* `data` - Property of `any type`. Contains any data associated with component. If assigned any component events 
  return back `data` value in `event` object. Default is `undefined`.  
* `label` - `String` contains label text. Default is `undefined`.
* `placeholder` - `String` placeholder text. Default is `undefined`.
* `value` - Component value. Type of `value` depends on component itself. In text edit component `value` is of 
  `String` type. In list box components `value` contains list item key value. Default is `null`.  
* `icon` - Icon name from available icon list (see [`TIcon`](#ticon)). If assigned the appropriate icon appeared 
  near text editor. Default is `undefined`. 
* `timeout` - `Number` contains timeout for `onChange` event. Default: `700 ms`.
* `layout` - Label position towards text editor. Available values:
  * `left` - Label is on the left from text editor. The default position for [`TText`](#ttext) and 
  [`TListBox`](#tlistbox) components.
  * `top` - Label is on the top of text editor. The default position for [`TMemo`](#tmemo) and [`TGroup`](#tgroup)
  components
* `mask` - Text mask. `mask` property represents object of type: `{mask: ..., empty: ...}` where:
  * `mask` - String field of the form `+1 (NNN) NNN-NN-NN` where `N` - any number.
  * `empty` - String represents empty symbol. If `empty` length more than one symbol only first is used.  
* `regexp` - Object of type `RegExp`. If assigned component tries to test entered text in comparison with entered 
    regular expression. If test failed then invalid style is applied.          
* `empty` - Value returned by `onChange` event when edit text is empty. Default is `null`. 
* `required` - Forces component switch to invalid style when value is invalid. If `onValidate` event is
  assigned then component behaves like `required` is `true`. Default is `true`. 
* `readOnly`- Prevents from user input. Default is `false`.
* `checked` - Value returned when [`TCheck`](#tcheck) is checked. Default `true`.
* `unchecked` - Value returned when [`TCheck`](#tcheck) is unchecked. Default is `false`.
* `wait` - When `true` component appears in grey color and doesn't respond on `onClick` event.

### Example

```javascript
import React from 'react';
import {TGroup, TButton, TText, clone, nvl} from 'tedit';

class MyComponent extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            text: '',
            phone: '',
            email: ''
        };
        this.change = this.change.bind(this);
    }
    
    change(event) {
        this.setState({[event.name]: event.value});
    } 

    render () {
        
         return (
             
            <TGroup 
                style={{container: {display: "flex", flexDirection: "column", width: "500px"}}} 
                label="Group box"> 
                
                <TButton style={{color: "green"}}>
                    {'Click me'}
                </TButton>
             
                <TText
                    style={{label: {width: "80px"}}}
                    value={this.state.text}
                    label={'Text:'}
                    name={'text'}
                    placeholder={'Enter more than 3 symbols ...'}
                    onValidate={(event) => {return nvl(event.value, '').length > 3;}}
                    onChange={this.change} />
    
                <TText
                    style={{label: {width: "180px"}}}
                    value={this.state.phone}
                    label={'Phone:'}
                    name={'phone'}
                    placeholder={'Enter phone number ...'}
                    mask={{mask: '+1 (NNN) NNN-NN-NN', empty: '_'}}                    
                    onChange={this.change} />
    
                <TText
                    style={{label: {width: "180px"}}}
                    value={this.state.email}
                    label={'EMail:'}
                    name={'email'}
                    regexp={TText.regexp['email']}
                    placeholder={'Enter email address ...'}
                    onChange={this.change} />
                
            </TGroup>    
                
         );
         
    }
    
}

export default MyComponent;
```

## Events

Some events are occur with delay determined by `timeout` property. Default timeout is `500 ms`. 
All events have one argument `event` of type `Object`. The structure of `event` object depends on caller 
component. The whole list of `event` fields listed below: 

* `name` - component name from `name` property.
* `data` - any data from `data` property.
* `value` - current component value. Text editors contain entered tex but list boxes contain selected item key value. 
* `icon` - contains clicked icon name.
* `button` - contains clicked button name.       
* `item` - contains whole selected list item.
* `index` - contains selected item index.
* `empty` - indicates whether component is empty.
* `full` - indicates whether component contains valid text.
* `caret` - contains current caret position.
* `key` - contains last entered key code.

### `ClickEvent` 

Emerges each time when user clicks on component. Contains fields:

* `name`
* `data`

### `IconClickEvent`

Emerges each time when user clicks on component nested icon. Contains fields:

* `name`
* `data`
* `icon`      
* `value`

### `ValueChangeEvent`

Emerges each time when edit text is changed. Contains fields:

* `name`
* `data`
* `value`

### `ListChangeEvent`

Emerges each time when item selected from list in list edit components. Contains fields:

* `name`
* `data`
* `value` - contains selected item key value.
* `item`
* `index`

### `ValidateEvent`

Emerges when text validation is needed. Contains fields:

* `name`
* `data`
* `value` - contains text to validate.
* `empty`
* `full`

Returns `boolean`. When event returns `false` the component changes it's style to `invalid`.
       
### `MaskCheckEvent`

Emerges when text mask checking is needed when when `mask` property is empty. Developers can 
use `omMask` property in `TText` component to write own mask check logic. If `mask` property 
contains any available masks `TText` component uses internal formatting engine to mask entered text.
Contains fields:

* `name`
* `data`
* `value` - contains text to be masked.
* `empty`
* `full` - indicates whether component contains valid text.
* `caret` - contains current caret position.
* `key` - contains last entered key code.

Returns `boolean`. The event mast returns the same type of object back  
`{value: ..., full: ..., empty: ... , caret: ..., key: ...}` with `value` and `caret` containing new 
values of text and caret position.  

### `SearchEvent`

Emerges when list box items is needed. Has two arguments: `event` and `callback`. 

`event` structure:

* `name`
* `data`
* `value` - contains text for use in filtering records.
* `key` - contains item key value for use in filtering records.

Callback:

`callback` function:

Returns `Arrray` of items like `{key: ..., value: ...}` where first field contains item key value and the second - 
item text. One can use any names for fields. There are only sequence has matter. `callback` function cn be called 
for instance after receiving items from remote server or at any other moment asynchronously.    

# Component descriptions

## `TText`

`TText` represents one line text editor with label and icon

### Style structure:

* `container`
* `frame`
* `label`
* `edit`
* `icon`
* `invalid` 

### Component properties:

* `style`
* `value`
* `name` 
* `data` 
* `label`
* `icon` 
* `timeout`: `700ms`
* `placeholder`
* `layout`: `left`
* `mask` 
* `regexp`          
* `empty`: `null` 
* `required`: `true` 
* `readOnly`: `false`

### Component events:

* `onChange`: [`TextChangeEvent`](#valuechangeevent)
* `onValidate`: [`ValidateEvent`](#validateevent)  
* `onIcon`: [`IconClickEvent`](#iconclickevent)
* `onMask`: [`MaskCheckEvent`](#maskcheckevent)

## `TDate`

`TDate` represents component for date value. Performs date validation while entering. Extends `TText` component. 

### Style structure:

* `container`
* `frame`
* `label`
* `edit`
* `icon`
* `invalid` 

### Component properties:

* `style`
* `value`
* `name` 
* `data` 
* `label`
* `icon` 
* `timeout`: `700ms`
* `layout`: `left`
* `mask` - Date mask. Default mask is: `{mask: 'DD.MM.YYYY', empty: '-'}`.
  * `DD`- day
  * `MM` - month
  * `YYYY` - year
* `empty`: `null` 
* `required`: `true` 
* `readOnly`: `false`
  
### Component events:

* `onChange`: [`TextChangeEvent`](#valuechangeevent)
* `onIcon`: [`IconClickEvent`](#iconclickevent)

## `TTime`

`TTime` represents component for time value. Performs time validation while entering. Extends `TText` component. 

### Style structure:

* `container`
* `frame`
* `label`
* `edit`
* `icon`
* `invalid` 

### Component properties:

* `style`
* `value`
* `name` 
* `data` 
* `label`
* `icon` 
* `timeout`: `700ms`
* `layout`: `left`
* `mask` - Time mask. Default mask is: `{mask: 'hh:mm', empty: '-'}`.
  * `hh` - hours
  * `mm` - minutes
  * `ss` - seconds 
* `empty`: `null` 
* `required`: `true` 
* `readOnly`: `false`

### Component events:

* `onChange`: [`TextChangeEvent`](#valuechangeevent)
* `onIcon`: [`IconClickEvent`](#iconclickevent)

## `TCheck`

`TCheck` represents check box.

### Style structure:

* `container`
* `frame`
* `label`
* `icon`

### Component properties:

* `style`
* `name` 
* `data` 
* `value`
* `label`
* `checked`: `true`
* `unchecked`: `false`

### Component events:

* `onChange`: [`ValueChangeEvent`](#valuechangeevent)

## `TButton`

`TButton` represents button.

### Style structure:

Doesn't have any special style structure.

### Component properties:

* `style`
* `name` 
* `data` 
* `wait`

### Component events:

* `onClick`: [`ClickEvent`](#clickevent)

## `TIcon`

`TIcon` draws svg icon. 

### Style structure:

Doesn't have any special style structure.

### Component properties:

* `style`
* `name` - Icon name name. Available icon list:
  * `edit`
  * `save`
  * `add`
  * `delete`
  * `up`
  * `down`
  * `checked`
  * `unchecked`
  * `menu`
  * `close`
  * `car`
  * `refresh`
  * `bagel` 
* `data` 

### Component events:

* `onClick`: [`ClickEvent`](#clickevent)

### Example:  

```javascript

```

