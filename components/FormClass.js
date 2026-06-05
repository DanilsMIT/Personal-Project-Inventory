import { closeModal } from "./utils.js";

export default class Form {
  constructor({ PopupSelector, handleFormSubmit }) {
    this._PopupSelector = PopupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._PopupSelector.querySelector(".popup__form");
    this._inputs = this._PopupSelector.querySelectorAll(".popup__input");
    this.setEventListeners();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  closeForm() {
    this._form.reset();
    closeModal(this._PopupSelector);
  }
}
