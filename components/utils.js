function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function closePopUps() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_is-opened")) {
        closeModal(popup);
      }
      if (event.target.classList.contains("popup__close")) {
        closeModal(popup);
      }
    });
  });
}

export { openModal, closeModal, closePopUps };
