import React from "react";

function ImagePopup({ name, card, isOpen, onClose }) {
  const popupClassName = `popup overlay popup_type_${name} ${
    isOpen ? "popup_opened" : " "
  }`;
  return (
    <div className={popupClassName}>
      <div className="popup__container-image">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img
          src={card.card.link}
          alt={card.card.name}
          className="popup__image"
        />
        <h2 className="popup__image-title">{card.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
