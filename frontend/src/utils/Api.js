import { settingConfig } from "../utils/constants.js";

class Api {
  constructor(settings) {
    this._url = settings.url;
    this._headers = settings.headers;
  }
   _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserProfile() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
  }).then(this._checkResponse);
  }

  updateUserProfile({ name, job }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
   }).then(this._checkResponse);
  }

  switchCardLikes(idCard, likeStatus) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: likeStatus ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  url: settingConfig.url,
  headers: settingConfig.headers,
});
