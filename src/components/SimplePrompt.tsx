import { KeyboardEventHandler, useLayoutEffect, useRef, useState } from 'react';

interface Props {
  initialInputValue: string;
  onBlur: () => void;
  placeholder: string;
  onSubmit: (value: string) => void;
}

const SimplePrompt = ({ initialInputValue, onBlur, placeholder, onSubmit }: Props) => {
  const [value, setValue] = useState(initialInputValue);

  const inputRef = useRef(null)

  const selectionRef = useRef(null);

  /* 💁 I only want this effect to run once. Probably a better way to do this.*/
  // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
  useLayoutEffect(() => {
    if (!selectionRef.current) {
      // @ts-ignore
      selectionRef.current = true;
      // @ts-ignore
      inputRef.current.setSelectionRange(0, value.length);
    }
  });

  const maybeSubmit: KeyboardEventHandler<HTMLInputElement> = (event) => {
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
