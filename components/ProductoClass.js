import { openModal } from "./utils.js";
export default class producto {
  #id;
  #template;
  constructor(
    { id, articulo, precio, picture },
    template,
    handleEditFunction,
    handleDeleteFunction,
  ) {
    this.#id = id;
    this.articulo = articulo;
    this.precio = precio;
    this.picture = picture;
    this.#template = template;
    this.handleEditFunction = handleEditFunction;
    this.handleDeleteFunction = handleDeleteFunction;
  }

  getID() {
    return this.#id;
  }

  #getTemplate() {
    const objectTemplate = document
      .querySelector(this.#template)
      .content.querySelector(".product-item")
      .cloneNode(true);
    return objectTemplate;
  }

  #viewpopUp() {
    const objectPicturePopUp = document.querySelector(
      "#product-item__imagen-popup",
    );

    const objectPicture = objectPicturePopUp.querySelector(".popup__image");
    objectPicture.src = this.picture;
    openModal(objectPicturePopUp);
    this.handleEditFunction(this);
  }

  editElement() {
    const popUpEditForm = document.querySelector("#popup-edit-product");
    openModal(popUpEditForm);
    this.handleEditFunction(this);
  }

  updateElement(data) {
    this.articulo = data.editArticulo;
    this.precio = Number(String(data.editPrecio).replace(",", ".")).toFixed(2);

    const articulo = this._element.querySelector(".product-item__name");
    const price = this._element.querySelector(".product-item__price");

    articulo.textContent = data.editArticulo;
    price.textContent = data.editPrecio;
  }

  removeElement() {
    this._element.remove();
  }

  setEventListeners() {
    this._element
      .querySelector(".product-item__image")
      .addEventListener("click", () => {
        this.#viewpopUp();
      });
    this._element
      .querySelector(".product-item__edit-btn")
      .addEventListener("click", () => {
        this.editElement();
      });
    this._element.addEventListener("contextmenu", () => {
      this.handleDeleteFunction(this);
    });
  }
  generateObject() {
    this._element = this.#getTemplate();
    this.setEventListeners();

    const articulo = this._element.querySelector(".product-item__name");
    const price = this._element.querySelector(".product-item__price");
    const image = this._element.querySelector(".product-item__image");

    articulo.textContent = this.articulo;
    price.textContent = Number(String(this.precio).replace(",", ".")).toFixed(
      2,
    );
    image.src = this.picture;

    return this._element;
  }
}
