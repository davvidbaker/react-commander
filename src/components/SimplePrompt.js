import * as React from 'react';

function SimplePrompt({ initialInputValue, onBlur, placeholder, onSubmit }) {
  const [value, setValue] = React.useState(initialInputValue);
  const inputRef = React.useRef(null);

  const selectionRef = React.useRef();

  /* 💁 I only want this effect to run once. */
  // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
  React.useLayoutEffect(() => {
    if (!selectionRef.current) {
      selectionRef.current = true;
      inputRef.current.setSelectionRange(0, value.length);
    }
  });

  const maybeSubmit = event => {
    if (event.key === 'Enter') {
      setValue('');
      onSubmit(value);
    }
  };

  return (
    <input
      autoFocus
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={maybeSubmit}
      placeholder={placeholder}
      onBlur={onBlur}
      ref={inputRef}
    />
  );
}

export default SimplePrompt;
