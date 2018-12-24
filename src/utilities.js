/* ⚠️ todo strip warnings in production build */
function warning(fn) {
  fn();
}
function warn(...args) {
  console.warn('😲', ...args);
}

function parameterDefined(parameters, parameter) {
  return typeof parameters[parameter.key] !== 'undefined';
}

export function commandHasParameters(command) {
  return command.parameters && command.parameters.length > 0;
}

export function commandFullyLoaded(command, parameters) {
  for (let parameter of command.parameters) {
    if (parameterDefined(parameters, parameter)) continue;
    else return false;
  }

  return true;
}

export function currentParameter(command, parameters) {
  for (let parameter of command.parameters) {
    if (parameterDefined(parameters, parameter)) continue;
    else return parameter;
  }
  return null;
}

export function parameterGivenKey(command, givenKey) {
  const parameter = command.parameters.find(({ key }) => key === givenKey);

  warning(() => {
    if (!parameter) {
      warn(`parameter with key ${givenKey} not found on command:`, command);
    }
  });

  return parameter;
}

export function parameterDisplayValue(value, parameter, getItems) {
  return parameter.selector
    ? getItems(parameter.selector).find(
        item => item[parameter.itemReturnKey] === value,
      )[parameter.itemStringKey]
    : value;
}
