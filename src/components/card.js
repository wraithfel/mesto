// card.js
export function createCard(cardData, templateSelector, handleImageClick, cardId) {
  const cardTemplate = document.querySelector(templateSelector).content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCount = cardElement.querySelector(".counter__like");

  // Лайк
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
    if (likeButton.classList.contains("card__like-button_is-active")) {
      fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          authorization: "804fc1f6-ae2f-43b2-b4f0-e3fb55b31129",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject("Ошибка добавления лайка");
        }
      });
      likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
    } else {
      fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: "804fc1f6-ae2f-43b2-b4f0-e3fb55b31129",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject("Ошибка удаления лайка");
        }
      });
      likeCount.textContent = parseInt(likeCount.textContent, 10) - 1;
    }
  });

  // Удаление карточки
  deleteButton.addEventListener("click", () => {
    fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "804fc1f6-ae2f-43b2-b4f0-e3fb55b31129",
      },
    })
      .then((res) => {
        if (res.ok) {
          cardElement.remove();
        } else {
          return Promise.reject("Ошибка при удалении карточки");
        }
      })
      .catch((err) => console.log(`error:${err}`));
  });

  // Открытие изображения
  cardImage.addEventListener("click", () => {
    handleImageClick(cardData);
  });

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  return cardElement;
}
