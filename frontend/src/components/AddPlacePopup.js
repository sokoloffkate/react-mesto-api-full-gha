import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup({ isOpen, onClose, onAddNewPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddNewPlace({ name: name, link: link });
  };

  return (
    <PopupWithForm
      name="popup_add_card"
      title="Новое место"
      btnName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddSubmit}
    >
      <input
        type="text"
        value={name || ""}
        onChange={handleChangeName}
        className="popup__field popup__field_place_name"
        placeholder="Название"
        name="place-name"
        minLength={2}
        maxLength={30}
        id="field-place"
        required
      />
      <span className="popup__field-error field-place-error"></span>
      <input
        type="url"
        value={link || ""}
        onChange={handleChangeLink}
        className="popup__field popup__field_place_link"
        placeholder="Ссылка на картинку"
        name="place-link"
        id="field-link"
        required
      />
      <span className="popup__field-error field-link-error"></span>
    </PopupWithForm>
  );
}
