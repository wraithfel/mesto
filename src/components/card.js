// card.js
export function createCard(cardData, templateSelector, handleImageClick) {
  const cardTemplate = document.querySelector(templateSelector).content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Лайк
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  // Удаление карточки
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
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
