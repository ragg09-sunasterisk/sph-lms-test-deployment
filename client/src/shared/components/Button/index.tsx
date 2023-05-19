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
}: ButtonProps) => {
  return (
    <div className="flex flex-row">
      <button
        className={`font-semibold rounded ${textColor} ${color} ${hover} ${width} ${buttonClass}`}
        onClick={onClick}
        type={type}
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
};

export default Button;
