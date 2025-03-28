// Импорт модулей
import { createCard } from "./card.js";
import { openModal, deleteModal } from "./modal.js";
import { ShowValidMessage } from "./validate.js";
import "../pages/index.css";
import "../vendor/fonts.css";
import "../vendor/normalize.css";

const currentUserId = "21ad6fadc4894fe61263adf9";
//Данные пользователя
fetch("https://nomoreparties.co/v1/apf-cohort-202/users/me", {
  headers: {
    authorization: "804fc1f6-ae2f-43b2-b4f0-e3fb55b31129",
  },
})
  .then((res) => res.json())
  .then((data) => {
    name.textContent = data.name;
    job.textContent = data.about;
    image.style.backgroundImage = `url(${data.avatar})`;
  });

// Данные карточек
fetch("https://nomoreparties.co/v1/apf-cohort-202/cards", {
  headers: {
    authorization: "804fc1f6-ae2f-43b2-b4f0-e3fb55b31129",
  },
})
  .then((res) => res.json())
  .then((data) => {
    data.forEach((cardData) => {
      const card = createCard(cardData, cardTemplateSelector, handleImageClick, cardData._id);
      const like_counter = card.querySelector(".counter__like");
      const like = card.querySelector(".card__like-button");
      cardData.likes.forEach((usr) => {
        if (usr._id === currentUserId) {
          like.classList.add("card__like-button_is-active");
        }
      });
      like_counter.textContent = cardData.likes.length;
      if (cardData.owner._id !== currentUserId) {
        card.querySelector(".card__delete-button").style.display = "none";
      }
      placesList.appendChild(card);
    });
  });

// DOM-элементы
const placesList = document.querySelector(".places__list");
const cardTemplateSelector = "#card-template";

const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__description");
const image = document.querySelector(".profile__image");

// Попапы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupImageElement = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

// Кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

// Формы
const profileForm = profilePopup.querySelector(".popup__form");
const cardForm = cardPopup.querySelector(".popup__form");

// Инпуты профиля
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");

// Инпуты карточки
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const linkInput = cardPopup.querySelector(".popup__input_type_url");

// Ошибки и кнопки
const errorMessageName = profilePopup.querySelector("#nameError");
const errorMessageJob = profilePopup.querySelector("#jobError");
const errorMessagePlace = cardPopup.querySelector("#placeError");
const errorMessageUrl = cardPopup.querySelector("#urlError");

const profileSaveButton = profilePopup.querySelector(".popup__button");
const cardSaveButton = cardPopup.querySelector(".popup__button");

// Анимация попапов
[profilePopup, cardPopup, imagePopup].forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Обработчики
function handleImageClick(cardData) {
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  fetch("https://nomoreparties.co/v1/apf-cohort-202/users/me", {
    method: "PATCH",
    headers: {
      authorization: "804fc1f6-ae2f-43b2-b4f0-e3fb55b31129",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (profileSaveButton.classList.contains("non-active-button")) return;
      name.textContent = data.name;
      job.textContent = data.about;
      deleteModal(profilePopup);
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  fetch("https://nomoreparties.co/v1/apf-cohort-202/cards", {
    method: "POST",
    headers: {
      authorization: "804fc1f6-ae2f-43b2-b4f0-e3fb55b31129",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardNameInput.value,
      link: linkInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (profileSaveButton.classList.contains("non-active-button")) return;
      const newCard = createCard(
        { name: data.name, link: data.link },
        cardTemplateSelector,
        handleImageClick,
        data._id
      );
      placesList.prepend(newCard);
      deleteModal(cardPopup);
    });
}

// Навешивание слушателей
editButton.addEventListener("click", () => {
  const name = document.querySelector(".profile__title").textContent;
  const job = document.querySelector(".profile__description").textContent;

  nameInput.value = name;
  jobInput.value = job;

  openModal(profilePopup);
});

addButton.addEventListener("click", () => openModal(cardPopup));

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    deleteModal(popup);
  });
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

// Валидация инпутов
nameInput.addEventListener("input", () =>
  ShowValidMessage(profileForm, nameInput, errorMessageName, profileSaveButton)
);

jobInput.addEventListener("input", () => ShowValidMessage(profileForm, jobInput, errorMessageJob, profileSaveButton));

cardNameInput.addEventListener("input", () =>
  ShowValidMessage(cardForm, cardNameInput, errorMessagePlace, cardSaveButton)
);

linkInput.addEventListener("input", () => ShowValidMessage(cardForm, linkInput, errorMessageUrl, cardSaveButton));

// Закрытие по клику на оверлей
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      deleteModal(popup);
    }
  });
});
