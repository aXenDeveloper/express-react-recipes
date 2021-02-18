import { FC } from 'react';
import { ModalType } from '../types/componentsType';

const Modal: FC<ModalType> = ({ isOpen, setIsOpen, children }) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="modal">
            <div className="modal_content container_box padding">{children}</div>
          </div>
          <div className="modal_background" onClick={() => setIsOpen(false)}></div>
        </>
      )}
    </>
  );
};

export default Modal;
