// card.js
import { addLike, removeLike, deleteCard as deleteCardAPI } from "./api.js";

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
      addLike(cardId)
        .then(() => {
          likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
        })
        .catch((err) => {
          console.error(err);
          // Возвращаем предыдущее состояние кнопки, если произошла ошибка
          likeButton.classList.toggle("card__like-button_is-active");
        });
    } else {
      removeLike(cardId)
        .then(() => {
          likeCount.textContent = parseInt(likeCount.textContent, 10) - 1;
        })
        .catch((err) => {
          console.error(err);
          // Возвращаем предыдущее состояние кнопки, если произошла ошибка
          likeButton.classList.toggle("card__like-button_is-active");
        });
    }
  });

  // Удаление карточки
  deleteButton.addEventListener("click", () => {
    deleteCardAPI(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => console.log(`error: ${err}`));
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
