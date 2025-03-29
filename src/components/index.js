// index.js

// Импорт модулей
import { createCard } from "./card.js";
import { openModal, deleteModal } from "./modal.js";
import { ShowValidMessage } from "./validate.js";
import { getUserInfo, getCards, updateUserInfo, addCard, updateAvatar } from "./api.js";
import "../pages/index.css";
import "../vendor/fonts.css";
import "../vendor/normalize.css";

// Идентификатор текущего пользователя
const currentUserId = "21ad6fadc4894fe61263adf9";

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
const avatarPopup = document.querySelector(".popup_type_avatar");
const popupImageElement = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

// Кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

// Формы
const profileForm = profilePopup.querySelector(".popup__form");
const cardForm = cardPopup.querySelector(".popup__form");
const avaForm = avatarPopup.querySelector(".popup__form");

// Инпуты профиля
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");

// Инпуты карточки
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const linkInput = cardPopup.querySelector(".popup__input_type_url");
const avaLinkInput = avatarPopup.querySelector(".popup__input_type_url");

// Элементы для вывода ошибок и кнопки сохранения
const errorMessageName = profilePopup.querySelector("#nameError");
const errorMessageJob = profilePopup.querySelector("#jobError");
const errorMessagePlace = cardPopup.querySelector("#placeError");
const errorMessageUrl = cardPopup.querySelector("#urlError");
const avaErrorMessageUrl = avatarPopup.querySelector("#urlError");
const profileSaveButton = profilePopup.querySelector(".popup__button");
const cardSaveButton = cardPopup.querySelector(".popup__button");
const avaSaveButton = avatarPopup.querySelector(".popup__button");

// Обработчик клика по изображению карточки (открытие попапа с картинкой)
function handleImageClick(cardData) {
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileSaveButton.textContent = "Сохранение...";
  updateUserInfo(nameInput.value, jobInput.value)
    .then((data) => {
      if (profileSaveButton.classList.contains("non-active-button")) return;
      name.textContent = data.name;
      job.textContent = data.about;
      deleteModal(profilePopup);
    })
    .catch((err) => {
      console.error("Ошибка обновления профиля:", err);
      profileSaveButton.textContent = "Сохранить";
    })
    .finally(() => {
      profileSaveButton.textContent = "Сохранить";
    });
}

// Обработчик отправки формы добавления новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardSaveButton.textContent = "Сохранение...";
  addCard(cardNameInput.value, linkInput.value)
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
    })
    .catch((err) => {
      console.error("Ошибка добавления карточки:", err);
      cardSaveButton.textContent = "Сохранить";
    })
    .finally(() => {
      cardSaveButton.textContent = "Сохранить";
    });
}

// Обработчик отправки формы обновления аватара
function handleAvaFormSubmit(evt) {
  evt.preventDefault();
  avaSaveButton.textContent = "Сохранение...";
  updateAvatar(avaLinkInput.value)
    .then((data) => {
      image.style.backgroundImage = `url(${data.avatar})`;
      deleteModal(avatarPopup);
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
      avaSaveButton.textContent = "Сохранить";
    })
    .finally(() => {
      avaSaveButton.textContent = "Сохранить";
    });
}

// Получение данных пользователя и установка на страницу
getUserInfo()
  .then((data) => {
    name.textContent = data.name;
    job.textContent = data.about;
    image.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {
    console.error("Ошибка получения данных пользователя:", err);
  });

// Получение карточек и их отрисовка
getCards()
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
  })
  .catch((err) => {
    console.error("Ошибка получения карточек:", err);
  });

// Навешивание слушателей событий

// Открытие попапа редактирования профиля с подстановкой текущих данных
editButton.addEventListener("click", () => {
  const currentName = name.textContent;
  const currentJob = job.textContent;
  nameInput.value = currentName;
  jobInput.value = currentJob;
  openModal(profilePopup);
});

// Открытие попапа добавления карточки
addButton.addEventListener("click", () => openModal(cardPopup));

// Открытие попапа обновления аватара по клику на изображение профиля
image.addEventListener("click", () => openModal(avatarPopup));

// Закрытие попапов по клику на кнопку закрытия
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    deleteModal(popup);
  });
});

// Отправка форм
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
avaForm.addEventListener("submit", handleAvaFormSubmit);

// Валидация инпутов
nameInput.addEventListener("input", () =>
  ShowValidMessage(profileForm, nameInput, errorMessageName, profileSaveButton)
);
jobInput.addEventListener("input", () => ShowValidMessage(profileForm, jobInput, errorMessageJob, profileSaveButton));
cardNameInput.addEventListener("input", () =>
  ShowValidMessage(cardForm, cardNameInput, errorMessagePlace, cardSaveButton)
);
linkInput.addEventListener("input", () => ShowValidMessage(cardForm, linkInput, errorMessageUrl, cardSaveButton));
avaLinkInput.addEventListener("input", () =>
  ShowValidMessage(avaForm, avaLinkInput, avaErrorMessageUrl, avaSaveButton)
);

// Закрытие попапа при клике на оверлей
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      deleteModal(popup);
    }
  });
});
