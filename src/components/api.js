// api.js
const BASE_URL = "https://nomoreparties.co/v1/apf-cohort-202";
const AUTH_TOKEN = "804fc1f6-ae2f-43b2-b4f0-e3fb55b31129";

function getUserInfo() {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: AUTH_TOKEN,
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка при получении данных пользователя: ${res.status}`);
  });
}

function getCards() {
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      authorization: AUTH_TOKEN,
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка при получении карточек: ${res.status}`);
  });
}

function updateUserInfo(name, about) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, about }),
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка при обновлении профиля: ${res.status}`);
  });
}

function addCard(name, link) {
  return fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {
      authorization: AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link }),
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка при добавлении карточки: ${res.status}`);
  });
}

function updateAvatar(avatar) {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar }),
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject("Убедитесь в корректности ссылки");
  });
}

function addLike(cardId) {
  return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: AUTH_TOKEN,
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject("Ошибка добавления лайка");
  });
}

function removeLike(cardId) {
  return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: AUTH_TOKEN,
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject("Ошибка удаления лайка");
  });
}

function deleteCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: AUTH_TOKEN,
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject("Ошибка при удалении карточки");
  });
}

export { getUserInfo, getCards, updateUserInfo, addCard, updateAvatar, addLike, removeLike, deleteCard };
