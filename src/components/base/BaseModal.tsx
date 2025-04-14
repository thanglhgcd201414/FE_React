import { Modal } from 'antd';
import * as React from 'react';

interface IProps {
  isOpen?: boolean;
  className?: string;
  handleClose?: () => void;
  children: React.ReactNode;
  [x: string]: any;
}

export default function BaseModal({
  className,
  children,
  handleClose,
  isOpen,
  ...propsAttributes
}: IProps) {
  const handleCloseModal = () => {
    if (handleClose) handleClose();
  };

  return (
    <>
      <Modal
        className={className}
        centered
        open={isOpen}
        onCancel={handleCloseModal}
        {...propsAttributes}
      >
        {children}
      </Modal>
    </>
  );
}
