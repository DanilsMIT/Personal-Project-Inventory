import { openModal, closeModal } from "./utils.js";

export default class ConfirmAction {
  constructor(PopupSelector) {
    this.PopupSelector = PopupSelector;
    this._okButton = this.PopupSelector.querySelector(".popup__button");
    this._handleSubmit = this._handleSubmit.bind(this);
    this.setEventListeners();
  }

  window(actionFunction) {
    openModal(this.PopupSelector);
    document.addEventListener("keydown", this._handleSubmit);
    this._actionFunction = actionFunction;
  }

  close() {
    closeModal(this.PopupSelector);
    document.removeEventListener("keydown", this._handleSubmit);
  }

  _handleSubmit(event) {
    if (event.key === "Enter") {
      this._actionFunction();
      this.close();
    }
  }

  setEventListeners() {
    this._okButton.addEventListener("click", () => {
      this._actionFunction();
      this.close();
    });
  }
}
