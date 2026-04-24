import producto from "../components/productoClass.js";
import { productos } from "../components/productoDataBase.js";
import { closeModal } from "../components/utils.js";

const listaProductos = document.querySelector(".inventory-list");

function renderObjects(object, container) {
  const objectClass = new producto(object, "#product-template");
  const objectElement = objectClass.generateObject();
  container.append(objectElement);
}

productos.forEach((item) => {
  renderObjects(item, listaProductos);
});

//cerrar popUps
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
