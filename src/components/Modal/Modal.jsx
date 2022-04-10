import { useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import style from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ handleClose, children }) => {
  const close = useCallback (
    e => {
        console.log(e)
      if (e.code === 'Escape') {
        return handleClose();
      }
      if (e.target === e.currentTarget) {
        handleClose();
      }
    }, [handleClose]
  )
    

  useEffect(() => {
      
    document.addEventListener('keydown', close);
   return () => document.removeEventListener('keydown', close);
       
  }, []);

  return createPortal(
    <div onClick={close} className={style.overlay}>
      <div className={style.content}>
        <span onClick={close} className={style.close}>
          X
        </span>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default memo(Modal);

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
