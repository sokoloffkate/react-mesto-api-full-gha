import React from "react";
import PopupWithForm from "./PopupWithForm";

export function DeleteCardPopup({ card, isOpen, onClose, onDeleteCard }) {
 
  const handleDeleteCardSubmit = (e) => {
    e.preventDefault();
    onDeleteCard(card.card);
  };

  return (
    <PopupWithForm
      name="popup_confirm_delete"
      title="Вы уверены?"
      btnName="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteCardSubmit}
    >
      <></>
    </PopupWithForm>
  );
}
