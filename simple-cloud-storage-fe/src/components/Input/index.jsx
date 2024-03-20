/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import { forwardRef, memo, useRef } from "react";

/* eslint-disable react/prop-types */
const Input = forwardRef(function Input({
  inputLabel,
  inputType,
  inputPlaceholder,
  defaultInputVal,
  inputId,
  inputClassName,
  onBlur,
  onChange,
  name,
  error,
  control
}, ref) {
  const inputRef = useRef();
  return (
    <div className="inputContainer">
      <label htmlFor={inputId} className="inputLabel">
        {inputLabel}
      </label>
      <input
        type={inputType}
        placeholder={inputPlaceholder}
        value={defaultInputVal}
        id={inputId}
        className={`inputField ${inputClassName}`}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      {error?.message ? (
        <span className="errorMessage">{error?.message}</span>
      ) : null}
    </div>
  );
});

export default memo(Input);
