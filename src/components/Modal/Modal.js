import { useEffect } from 'react';
import css from '../Modal/Modal.module.css';

export const Modal = ({src, closeModal}) => {

  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);
  
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [closeModal])

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

    return (
      <div className={css.Overlay} onClick={onBackdropClick}>
        <div className={css.Modal}>
          <img
              src={src}
              alt="Here should be the bigger size of selected pic."
              width='1000px'
            />
        </div>
      </div>
    );
  }
