import React, { Fragment } from 'react';
import { type ModalProps } from '../../utils';

const Modal: React.FC<ModalProps> = ({ children, isOpen, className = '' }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Fragment>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`bg-white rounded-lg ${className}`}>
          <div className="max-h-auto">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};
export default Modal;
