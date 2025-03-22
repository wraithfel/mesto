// Импорт модулей
import { createCard } from "./card.js";
import { openModal, deleteModal } from "./modal.js";
import { ShowValidMessage } from "./validate.js";

// Данные карточек
const initialCards = [
  { name: "Архыз", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  { name: "Иваново", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg" },
  { name: "Камчатка", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg" },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  { name: "Байкал", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg" },
];

// DOM-элементы
const placesList = document.querySelector(".places__list");
const cardTemplateSelector = "#card-template";

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

  const name = document.querySelector(".profile__title");
  const job = document.querySelector(".profile__description");

  if (profileSaveButton.classList.contains("non-active-button")) return;

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  deleteModal(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  if (profileSaveButton.classList.contains("non-active-button")) return;

  const cardData = {
    name: cardNameInput.value,
    link: linkInput.value,
  };

  const newCard = createCard(cardData, cardTemplateSelector, handleImageClick);
  placesList.prepend(newCard);
  deleteModal(cardPopup);
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

// Отрисовка начальных карточек
initialCards.forEach((cardData) => {
  const card = createCard(cardData, cardTemplateSelector, handleImageClick);
  placesList.appendChild(card);
});
