export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validatorForms = {};

export const popUpAddBut = document.querySelector(".profile__add-button");
export const popUpEditBut = document.querySelector(".profile__edit-button");
export const popUpAvatarBut = document.querySelector(".profile__avatar");
export const popUpAddForm = document.querySelector(".popup__form_add_card");
export const popUpEditForm = document.querySelector(".popup__form_edit_card");
export const popUpCnangeAvatarForm = document.querySelector(
  ".popup__form_change_avatar"
);

export const popUpAdd = ".popup_add_card";
export const popUpEdit = ".popup_edit_profile";
export const popUpZoomInImg = ".popup_zoom-in_image";
export const cardGrid = ".elements-grid";
export const popUpConfirmDelete = ".popup_confirm_delete";
export const popUpChangeAvatar = ".popup_change_avatar";

export const formConfiguration = {
  formSelector: "popup__form",
  inputFormSelector: "popup__field",
  submitBtnSelector: ".popup__button",
};

export const popupConfiguration = {
  aciveModifier: "popup_opened",
  closeBtnSelector: "popup__close-button",
};

export const profileConfiguraton = {
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
};

export const viewImagConfiguration = {
  imgSelector: "popup__image",
  imgTitleSelector: "popup__image-title",
};

export const validConfig = {
  inputSelector: "popup__field",
  submitButtonSelector: "popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__field_error-red-line",
  errorClass: "popup__field-error",
};

export const stateSaveBtnConfig = {
  normalState: "Сохранить",
  activeState: "Сохранение...",
};

export const stateCreateBtnConfig = {
  normalState: "Создать",
  activeState: "Создание...",
};

export const token_jwt = localStorage.jwt;

export const settingConfig = {
  url: "https://api.mesto.sokolova.nomoredomains.monster",
  //headers: {
     // "Content-Type": "application/json",
     // authorization: `Bearer ${localStorage.jwt}`,
 // }
};
