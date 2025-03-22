// modal.js

export function openModal(popup) {
  document.addEventListener("keydown", closeByEsc);
  popup.classList.add("popup_is-opened");
}

export function deleteModal(popup) {
  document.removeEventListener("keydown", closeByEsc);
  popup.classList.remove("popup_is-opened");
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    deleteModal(openedPopup);
  }
}
