const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");

profilePopup.classList.add(".popup_is-animated");
cardPopup.classList.add(".popup_is-animated");
imagePopup.classList.add(".popup_is-animated");

function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function deleteModal(popup) {
  popup.classList.remove("popup_is-opened");
}

const editButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".popup__close");
const addButton = document.querySelector(".profile__add-button");
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const linkInput = cardPopup.querySelector(".popup__input_type_url");

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
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  deleteModal(profilePopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", () => {
  openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const arr = {
    name: cardNameInput.value,
    link: linkInput.value,
  };
  const newCard = createCard(arr);
  placesList.insertBefore(newCard, placesList.firstChild);
  deleteModal(cardPopup);
}

const cardFormElement = cardPopup.querySelector(".popup__form");

cardFormElement.addEventListener("submit", handleCardFormSubmit);
