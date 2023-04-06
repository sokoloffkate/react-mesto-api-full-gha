import React from "react";

function PopupWithForm({ name, title, btnName, children, isOpen, onClose, onSubmit }) {
  
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
        />
        <h2 className="popup__title">{`${title}`}</h2>
        <form action="submit" className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button">
            {btnName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
