export default class Form {
  constructor({ PopupSelector, handleFormSubmit }) {
    this._PopupSelector = PopupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._PopupSelector.querySelector(".popup__form");
    this._inputs = this._PopupSelector.querySelectorAll(".popup__input");
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

  close() {
    this._form.reset();
  }
}
