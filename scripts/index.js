import producto from "../components/ProductoClass.js";
import APIProductos from "../components/LCSRApi.js";
import { closeModal } from "../components/utils.js";
const listaProductos = document.querySelector(".inventory-list");

//API
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZnVlZmJ4bGphZ212anFsc3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDI3OTgsImV4cCI6MjA5NjE3ODc5OH0.t0gOmXwM3GQR-DR-_fR0jx2nQAr5fz9w2OwPdj-EDZI";

const ApiProductos = new APIProductos({
  url: "https://dafuefbxljagmvjqlssu.supabase.co/rest/v1/productos?select=*&order=id.asc",
  headers: {
    apikey: apiKey,
    authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
});

//renderizar objetos
function renderObjects(object, container) {
  const objectClass = new producto(object, "#product-template");
  const objectElement = objectClass.generateObject();
  container.append(objectElement);
}
//renderizar seccion
function renderSection(items) {
  items.forEach((item) => {
    renderObjects(item, listaProductos);
  });
}

//Empezando
ApiProductos.getProductos().then((data) => {
  renderSection(data);
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
