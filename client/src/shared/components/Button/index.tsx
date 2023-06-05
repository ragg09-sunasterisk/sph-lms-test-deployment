/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { type ReactElement } from 'react';

export interface ButtonProps {
  text: string;
  textColor?: string;
  color?: string;
  width?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  hover?: string;
  buttonClass?: string;
  children?: ReactElement;
  disabled?: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  textColor,
  color,
  width,
  onClick,
  type,
  hover,
  buttonClass,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <div className="flex flex-row">
      <button
        className={`font-semibold rounded disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed ${textColor} ${color} ${hover} ${width} ${buttonClass}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children} <span>{text}</span>
      </button>
    </div>
  );
};

Button.defaultProps = {
  color: 'bg-white',
  textColor: 'text-gray',
  width: 'w-auto',
  onClick: () => {},
  type: 'button',
  hover: '',
  buttonClass: '',
  disabled: false,
};

export default Button;
