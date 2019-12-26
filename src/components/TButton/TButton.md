TButton example:

```jsx inside Markdown
import {Button} from 'tedit';
const style = {width: "120px"};

<TButton
    style={style} 
    name={'myButton'}
    data={{id: 1}}
    onClick={(event) => {alert(event.name + ' data = ' + 
            JSON.stringify(event.data))}} >
        Click me
</TButton>
```