```jsx inside Markdown
import {TButton, TMemo, TGroup, nvl} from 'tedit';

const style = {
    container: {width: "120px", margin: "8px 0 8px 0"} 
};

initialState = {
    event: '',
    wait: false
};

function click(event) {
    setState({
        event: nvl(state.event, ' ') + JSON.stringify(event),
        wait: true
    });
    setTimeout(() => {
        setState({wait: false})
    }, 1000);
}

function clear() {
    setState({event: null});
}

<TGroup 
    style={{content: {border: "none"}}} 
    label={'TButton component example:'}>

    <TButton
        style={style} 
        name={'myButton'}
        data={{foo: 'bar'}}
        wait={state.wait}
        onClick={click}>
            Click me
    </TButton>

    <TMemo 
        style={{edit: {minHeight: "48px"}}} 
        label={'TButton onClick events:'} 
        icon={'refresh'} 
        value={state.event}
        onIcon={clear} />
    
</TGroup>
```