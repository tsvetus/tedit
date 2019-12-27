```jsx inside Markdown
import {TButton, TMemo, TGroup, nvl} from 'tedit';

const style = {
    container: {width: "120px", margin: "8px 0 8px 0"} 
};

function click(event) {
    setState({event: nvl(state.event, ' ') + JSON.stringify(event)});
}

function clear() {
    setState({event: null});
}

<TGroup 
    style={{content: {border: "none", padding: "16px"}}} 
    label={'TButton component example:'}>

    <TButton
        style={style} 
        name={'myButton'}
        data={{foo: 'bar'}}
        onClick={click}>
            Click me
    </TButton>

    <TMemo 
        style={{edit: {minHeight: "48px"}}} 
        label={'onClick events:'} 
        icon={'refresh'} 
        value={state.event}
        onIcon={clear} />
    
</TGroup>
```