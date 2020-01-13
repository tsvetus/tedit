```jsx inside Markdown
import {TTime, TMemo, TGroup} from 'tedit';

const style = {
    container: {width: "240px", margin: "8px 0 8px 0"}
};

initialState = {
    value: new Date(),
    event: ''
};

function change(event) {
    setState({
        value: event.value,
        event: state.event + ' ' + JSON.stringify(event)
    });
}

function clear() {
    setState({event: null});
}

<TGroup 
    style={{content: {border: "none"}}} 
    label={'TTime component example:'}>

    <TTime
        style={style} 
        name={'myDateEdit'}
        value={state.value}
        timeout={1}
        label={'Enter valid time:'}
        format={{mask: 'hh:mm', empty: '_', full: true, type: 'iso'}}
        onChange={change} />
        
    <TMemo 
        style={{edit: {minHeight: "48px"}}} 
        label={'onChange events:'} 
        icon={'refresh'} 
        value={state.event}
        onIcon={clear} />
    
</TGroup>
```