# tedit

Set of visual React components designed for constructing web application interfaces.

`tedit` provides set of visual components constructed on `<div>` element with editable content:
* [`TText`](#ttext)
* [`TMemo`](#tmemo)
* [`TListBox`](#tlistbox)

Other components:
* [`TCheck`](#tcheck)
* [`TIcon`](#ticon)
* [`TGroup`](#tgroup)
* [`TTop`](#tgroup)
* [`TSide`](#tgroup)
* [`TModal`](#tgroup)
* [`TForm`](#tgroup)
* [`TPanel`](#tcheck)
* [`TLogin`](#tcheck)

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
```
 
Each component has it's own style structure described below. In addition one can register global project 
styles using `registerStyles` function as follows: 

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

Each component has it's own set of properties. The whole list of `tedit` component properties 
listed below:

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
  near text editor.  
* `timeout` - `Number` contains timeout for `onChange` event. Default: `700 ms`.
* `layout` - Label position towards text editor. Available values:
  * `left` - Label is on the left from text editor. The default position for [`TText`](#ttext) and 
  [`TListBox`](#tlistbox) components.
  * `top` - Label is on the top of text editor. The default position for [`TMemo`](#tmemo) and [`TGroup`](#tgroup)
  components
* `mask` - Text mask. Now only text masks like `NN:NN` are supported where `N` is any number. `mask` property 
    represents object of type: `{mask: ..., empty: ...}` where:
* `mask` - String field of the form `+1 (NNN) NNN-NN-NN` where `N` - any number.
* `empty` - String represents empty symbol. If `empty` length more than one symbol only first is used.
#### `regexp` - Regular expression. If assigned component tries to test entered text in comparison with entered 
    regular expression. If test failed then invalid style is applied (see style structure).          
#### `empty` - Value used by `onChange` event when edit text is empty. Default is `null`. 
#### `required` - Forces component switch to invalid style when value is invalid. Default is `true`. 
#### `readOnly`- Prevents from user input. Default is `false`.


## Events

Some events are occur with delay determined by `timeout` property. Default timeout is `500 ms`. 
All events have one argument `event` of type `Object`. The structure of `event` object depends on caller 
component. The most common events are: 

#### `ClickEvent`
Emerges each time when user clicks on component.

`event={name: ..., data: ...}`
* `name` - component name from `name` property.
* `data` - any data from `data` property.

Any other events has `name` and `data` property as wel so we discuss below only newer properties.       

#### `IconClickEvent`
Emerges each time when user clicks on component nested icon.

`event={icon: ..., value: ...}`
* `icon` - contains icon name.      
* `value` - current component value.

#### `ValueChangeEvent`

Emerges each time when edit text is changed.

`event={value: ...}`
* `value` - edited text.

#### `ListChangeEvent`

Emerges each time when item selected from list in list edit components.

`event={value: ..., item: ..., index: ...}`
* `value` - contains selected item key value.
* `item` - contains whole selected list item.
* `index` - contains selected item index.

#### `ValidateEvent`

Emerges when text validation is needed..

`event={value: ..., empty: ..., full: ...}` similar to other events.
* `value` - contains last entered text.
* `empty` - indicates whether component is empty.
* `full` - indicates whether component contains valid text.
* Returns: - `boolean`. When event returns `false` the component changes it's style to `invalid` 
      (see style structure).
       
#### `MaskCheckEvent`

Emerges when text mask checking is needed when when `mask` property is empty. Developers can 
use `omMask` property in `TText` component to write own mask check logic. If `mask` property 
contains any available masks `TText` component uses internal formatting engine to mask entered text.

`event={value: ..., full: ..., empty: ... , caret: ..., key: ...}`
* `value` - contains current edited text.
* `empty` - indicates whether component is empty.
* `full` - indicates whether component contains valid text.
* `caret` - contains current caret position.
* `key` - contains last entered key code.
* Returns: - `boolean` The event mast returns the same type of object back 
`{value: ..., full: ..., empty: ... , caret: ..., key: ...}` with `value` and `caret` containing new 
values of text and caret position.  

#### `SearchEvent`

Emerges when list box items is needed. Has two arguments: `event` and `callback`.

`event={value: ..., key: ...}`
* `value` - contains current edited text.
* `key` - contains current item key value.

`callback` - function which returns `Arrray` of items like 
`{key: ..., value: ...}` where first field contains item
key value and the second - item text. One can use any names for fields. There are only sequence 
has matter. `callback` function cn be called for instance after receiving 
items from remote server or at any other moment asynchronously.    

# Component descriptions

## `TText`

`TText` represents one line text editor with label and icon (disabled by default)

### Style structure:

* `container` - Outer component container style.
* `frame` - Style for label, edit and icon box.
* `label` - Component label style.
* `edit` - Text editor style.
* `icon`- Clickable icon style.
* `invalid` - Object containing all fields listed above. `invlid` style applied when onValidate 
    event returns `false` or testing of regular expression supplied in `regexp` property is failed. 

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
* `layout` - Label position towards text editor. Available values:
  * `left` - Label is on the left from text editor. The default position.
  * `top` - Label is on the top of text editor. 
* `mask` - Text mask. Now only text masks like `NN:NN` are supported where `N` is any number. `mask` property 
    represents object of type: `{mask: ..., empty: ...}` where:
  * `mask` - String field of the form `+1 (NNN) NNN-NN-NN` where `N` - any number.
  * `empty` - String represents empty symbol. If `empty` length more than one symbol only first is used.
* `regexp` - Regular expression. If assigned component tries to test entered text in comparison with entered 
    regular expression. If test failed then invalid style is applied (see style structure).          
* `empty` - Value used by `onChange` event when edit text is empty. Default is `null`. 
* `required` - Forces component switch to invalid style when value is invalid. Default is `true`. 
* `readOnly`- Prevents from user input. Default is `false`.

### Component events:

* `onChange`: [`TextChangeEvent`](#valuechangeevent)
* `onValidate`: [`ValidateEvent`](#validateevent)  
* `onIcon`: [`IconClickEvent`](#iconclickevent)
* `onMask`: [`MaskCheckEvent`](#maskcheckevent)

## `TDate`

`TDate` represents component for date value. Performs date validation while entering. 
Extends `TText` component. 

### Style structure:

See [`TText`](#ttext)

### Component properties:

* `mask` - Date mask. Default mask is: `{mask: 'DD.MM.YYYY', empty: '-'}`.
  * `DD`- day
  * `MM` - month
  * `YYYY` - year
  
For other properties see [`TText`](#tdate) except `placeholder` and `regexp`. 

### Component events:

* `onChange`: [`TextChangeEvent`](#valuechangeevent)
* `onIcon`: [`IconClickEvent`](#iconclickevent)

## `TTime`

`TTime` represents component for time value. Performs time validation while entering. 
Extends `TText` component. 

### Style structure:

See [`TText`](#ttext)

### Component properties:

* `mask` - Time mask. Default mask is: `{mask: 'hh:mm', empty: '-'}`.
  * `hh` - hours
  * `mm` - minutes
  * `ss` - seconds 

For other properties see [`TText`](#tdate) except `placeholder` and `regexp`. 

### Component events:

See [`TDate`](#tdate)

## `TCheck`

`TCheck` represents check box.

### Style structure:

* `container` - Outer component container style.
* `frame` - Style for label and icon box.
* `label` - Component label style.
* `icon`- Check box icon style.

### Component properties:

* `style` - Component style.
* `name` - Component name. Use `name` property if you have one `onChange` events for multiply components. 
* `data` - Component data. Use `data` property if you want to associate component with some object. 
* `value` - Text to display.
* `label` - Label text.
* `checked` - Value returned when icon is checked. Default `true`.
* `unchecked` - Value returned when value is unchecked. Default is `false`.

### Component events:

* `onChange`: [`ValueChangeEvent`](#valuechangeevent)

## `TButton`

`TButton` represents button.

### Style structure:

Doesn't have any special style structure.

### Component properties:

* `style` - Component style.
* `name` - Component name. Use `name` property if you have one `onChange` events for multiply components. 
* `data` - Component data. Use `data` property if you want to associate component with some object. 
* `wait` - When `true` component appears in grey color and doesn't respond on `onClick` event.

### Component events:

* `onClick`: [`ClickEvent`](#clickevent)

## `TIcon`

`TIcon` draws svg icon. 

### Style structure:

Doesn't have any special style structure.

### Component properties:

* `style` - Component style.
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
* `data` - Component data. Use `data` property if you want to associate component with some object. 

For other properties see [`TDate`](#tdate). 

### Component events:

* `onClick`: [`ClickEvent`](#clickevent)

### Example:  

```javascript

```

