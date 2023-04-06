export const base_url = " https://auth.nomoreparties.co";

export const login = (email, password) => {
  return fetch(`${base_url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getUserData = (token) => {
  return fetch(`${base_url}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
