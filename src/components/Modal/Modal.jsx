import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Backdrop, ModalWindow } from './Modal.styled';

export const Modal = ({ imageURL, toggleModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', toggleModal);
    return () => {
      window.removeEventListener('keydown', toggleModal);
    };
  });

  return (
    <Backdrop onClick={toggleModal} data-backdrop>
      <ModalWindow>
        <img src={imageURL} alt={imageURL} />
      </ModalWindow>
    </Backdrop>
  );
};

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};