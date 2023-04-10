import React from "react";

export const InfoTooltip = ({ name, isOpen, onClose, images, text }) => {
  const popupClassName = `popup popup_type_${name} ${
    isOpen ? "popup_opened" : " "
  }`;

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <div className="popup__info">
          <img src={images} className="popup__info-logo" alt="Удача" />
          <h2 className="popup__info-title">{text}</h2>
        </div>
      </div>
    </div>
  );
};
