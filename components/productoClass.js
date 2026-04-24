import { openModal } from "./utils.js";

export default class producto {
  constructor({ producto, precio, link }, template) {
    this._producto = producto;
    this._precio = precio;
    this._link = link;
    this._template = template;
  }

  _getTemplate() {
    const objectTemplate = document
      .querySelector(this._template)
      .content.querySelector(".product-item")
      .cloneNode(true);
    return objectTemplate;
  }

  _viewpopUp() {
    const objectPicturePopUp = document.querySelector(
      "#product-item__imagen-popup",
    );
    const objectPicture = objectPicturePopUp.querySelector(".popup__image");

    objectPicture.src = this._link;
    openModal(objectPicturePopUp);
  }

  _setEventListeners() {
    this._element
      .querySelector(".product-item__image")
      .addEventListener("click", () => {
        this._viewpopUp();
      });
  }
  generateObject() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const producto = this._element.querySelector(".product-item__name");
    const price = this._element.querySelector(".product-item__price");
    const image = this._element.querySelector(".product-item__image");

    producto.textContent = this._producto;
    price.textContent = this._precio;
    image.src = this._link;

    return this._element;
  }
}
