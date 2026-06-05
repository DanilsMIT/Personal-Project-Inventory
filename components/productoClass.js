import { openModal } from "./utils.js";

export default class articulo {
  constructor({ articulo, precio, picture }, template) {
    this._articulo = articulo;
    this._precio = precio;
    this._picture = picture;
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

    objectPicture.src = this._picture;
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

    const articulo = this._element.querySelector(".product-item__name");
    const price = this._element.querySelector(".product-item__price");
    const image = this._element.querySelector(".product-item__image");

    articulo.textContent = this._articulo;
    price.textContent = this._precio;
    image.src = this._picture;

    return this._element;
  }
}
