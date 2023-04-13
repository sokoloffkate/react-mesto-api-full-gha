export const base_url = "https://api.mesto.sokolova.nomoredomains.monster";

export const login = (email, password) => {
  return fetch(`${base_url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};
export const register = (email, password) => {
  return fetch(`${base_url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const checkToken = (token) => {
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