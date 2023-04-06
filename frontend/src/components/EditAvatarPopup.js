import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  };

  useEffect(() => {
    avatarRef.current.value = ""
  }, [isOpen])

  return (
    <PopupWithForm
      name="popup_change_avatar"
      title="Обновить аватар"
      btnName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        ref={avatarRef}
        className="popup__field popup__field_place_link"
        placeholder="Ссылка на аватар"
        name="place-avatar"
        id="field-avatar"
        required
      />
      <span className="popup__field-error field-avatar-error"></span>
    </PopupWithForm>
  );
}
