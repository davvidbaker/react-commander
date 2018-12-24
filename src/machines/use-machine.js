import * as React from 'react';
import { interpret } from 'xstate/lib/interpreter';

function useMachine(machine, options = {}) {
  const [current, setCurrent] = React.useState(machine.initialState);
  const service = React.useMemo(
    () =>
      interpret(machine)
        .onTransition(state => {
          options.log && console.log('CONTEXT:', state.context);
          options.log && console.log(`STATE`, state.value);
          setCurrent(state);
        })
        .onEvent(e => options.log && console.log('EVENT:', e))
        .start(),
    [],
  );

  React.useEffect(() => {
    return () => service.stop();
  }, []);

  return [current, service.send];
}

export default useMachine;
