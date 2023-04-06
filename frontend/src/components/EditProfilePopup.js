import { CurrentUserContext } from "contexts/CurrentUserContext";
import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setDescription(currentUser.about);
    setName(currentUser.name);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name: name, job: description });
  };

  return (
    <PopupWithForm
      name="popup_edit_profile"
      title="Редактировать профиль"
      btnName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={name || ""}
        onChange={handleChangeName}
        className="popup__field popup__field_type_name"
        placeholder="Имя"
        name="input-name"
        minLength={2}
        maxLength={40}
        id="field-name"
        required
      />
      <span className="popup__field-error field-name-error"></span>
      <input
        type="text"
        value={description || ""}
        onChange={handleChangeDescription}
        className="popup__field popup__field_type_job"
        placeholder="Профессия"
        name="input-job"
        minLength={2}
        maxLength={200}
        id="field-job"
        required
      />
      <span className="popup__field-error field-job-error"></span>
    </PopupWithForm>
  );
}
