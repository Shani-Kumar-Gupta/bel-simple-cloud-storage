/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { memo } from 'react';
import Input from '../Input';
import { Controller } from 'react-hook-form';

const FormController = ({
  name: compName,
  control,
  defaultvalue,
  widget,
  inputType,
  ...elementProps
}) => {
  const renderComponent = (
    onChange,
    onBlur,
    value,
    name,
    ref,
    isTouched,
    error,
    label
  ) => {
    switch (widget) {
      case 'INPUT':
        return (
          <Input
            error={error}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            defaultInputVal={value}
            inputType={inputType}
            ref={ref}
            {...elementProps}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <Controller
      name={compName}
      control={control}
      defaultValue={defaultvalue}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirtry, error },
        formState,
      }) =>
        renderComponent(onChange, onBlur, value, name, ref, isTouched, error)
      }
    />
  );
};

export default memo(FormController);
