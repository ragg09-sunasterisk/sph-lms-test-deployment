/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable object-shorthand */
import React from 'react';

export interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  width?: string;
  height?: string;
  name?: string;
  value?: string;
  eventHandler?: (...args: any[]) => any;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type,
  id,
  width,
  height,
  name,
  value,
  eventHandler,
  className
}: InputFieldProps) => {
  const propStyle = {
    width: width,
    height: height
  };

  return (
    <div className="mb-4">
      {label !== '' && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className={`appearance-none border border-gray-300 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        style={propStyle}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={eventHandler}
      />
    </div>
  );
};

InputField.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  id: '',
  width: '100%',
  height: '',
  value: '',
  className: ''
};

export default InputField;
