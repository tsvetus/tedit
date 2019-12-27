```jsx inside Markdown
import {TCheck, TMemo, TGroup, nvl} from 'tedit';

const style = {
    container: {width: "120px", margin: "8px 0 8px 0"}, 
    label: {width: "80px"}
};

function change(event) {
    setState({event: nvl(state.event, ' ') + JSON.stringify(event)});
}

function clear() {
    setState({event: null});
}

<TGroup 
    style={{content: {border: "none", padding: "16px"}}} 
    label={'TCheck component example:'}>

    <TCheck
        style={style} 
        name={'myCkeckBox'}
        data={{foo: 'bar'}}
        label={'Click me:'}
        checked={1}
        unchecked={0}
        onChange={change} />
        
    <TMemo 
        style={{edit: {minHeight: "48px"}}} 
        label={'onChange events:'} 
        icon={'refresh'} 
        value={state.event}
        onIcon={clear} />
    
</TGroup>
```