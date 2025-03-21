const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

function openModal(popup) {
  document.addEventListener("keydown", closeByEsc);
  popup.classList.add("popup_is-opened");
}

function deleteModal(popup) {
  document.removeEventListener("keydown", closeByEsc);
  popup.classList.remove("popup_is-opened");
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    deleteModal(openedPopup);
  }
}

const editButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".popup__close");
const addButton = document.querySelector(".profile__add-button");
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const linkInput = cardPopup.querySelector(".popup__input_type_url");
const errorMessageName = profilePopup.querySelector("#nameError");
const errorMessageJob = profilePopup.querySelector("#jobError");
const profileSaveButton = profilePopup.querySelector(".popup__button");
const profileForm = profilePopup.querySelector(".popup__form");
const errorMessagePlace = cardPopup.querySelector("#placeError");
const errorMessageUrl = cardPopup.querySelector("#urlError");
const cardSaveButton = cardPopup.querySelector(".popup__button");
const cardForm = cardPopup.querySelector(".popup__form");

editButton.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openModal(profilePopup);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    deleteModal(popup);
  });
});

const profileFormElement = profilePopup.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = document.querySelector(".profile__title");
  const job = document.querySelector(".profile__description");
  if (profileSaveButton.classList.contains("non-active-button")) {
    return;
  } else {
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    deleteModal(profilePopup);
  }
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", () => {
  openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  if (profileSaveButton.classList.contains("non-active-button")) {
    return;
  } else {
    const arr = {
      name: cardNameInput.value,
      link: linkInput.value,
    };
    const newCard = createCard(arr);
    placesList.insertBefore(newCard, placesList.firstChild);
    deleteModal(cardPopup);
  }
}

function ShowValidMessage(form, input, errorMessage, validButton) {
  if (!input.validity.valid) {
    input.classList.add("input-error");
    errorMessage.textContent = input.validationMessage;
  } else if (input.value.length >= input.maxLength) {
    input.classList.add("input-error");
    errorMessage.textContent = `Достигнуто максимальное количество символов: ${input.maxLength}`;
  } else {
    input.classList.remove("input-error");
    errorMessage.textContent = "";
  }
  if (!form.checkValidity()) {
    validButton.classList.add("non-active-button");
  } else {
    validButton.classList.remove("non-active-button");
  }
}

nameInput.addEventListener("input", () =>
  ShowValidMessage(profileForm, nameInput, errorMessageName, profileSaveButton)
);
jobInput.addEventListener("input", () => ShowValidMessage(profileForm, jobInput, errorMessageJob, profileSaveButton));

cardNameInput.addEventListener("input", () =>
  ShowValidMessage(cardForm, cardNameInput, errorMessagePlace, cardSaveButton)
);
linkInput.addEventListener("input", () => ShowValidMessage(cardForm, linkInput, errorMessageUrl, cardSaveButton));

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    // Если клик был по самому фону (оверлею), а не по содержимому
    if (evt.target === popup) {
      deleteModal(popup);
    }
  });
});

const cardFormElement = cardPopup.querySelector(".popup__form");

cardFormElement.addEventListener("submit", handleCardFormSubmit);
