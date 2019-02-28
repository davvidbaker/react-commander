/* eslint-disable no-unused-expressions, no-console */
import { useState, useMemo, useEffect } from 'react';
import { interpret } from 'xstate/lib/interpreter';

function useMachine(machine, options = {}) {
  const [current, setCurrent] = useState(machine.initialState);
  const service = useMemo(
    () =>
      interpret(machine)
        .onTransition(state => {
          options.log && console.log('CONTEXT:', state.context);
          options.log && console.log('STATE', state.value);
          setCurrent(state);
        })
        .onEvent(e => options.log && console.log('EVENT:', e))
        .start(),
    [],
  );

  useEffect(() => () => service.stop(), []);

  return [current, service.send];
}

export default useMachine;
