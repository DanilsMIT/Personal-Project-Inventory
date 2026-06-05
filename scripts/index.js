import producto from "../components/ProductoClass.js";
import Form from "../components/FormClass.js";
import APIProductos from "../components/LCSRApi.js";
import { closePopUps, closeModal } from "../components/utils.js";
import {
  editFormPopup,
  editinputId,
  editinputArticulo,
  editinputPrecio,
} from "../components/constants.js";

const listaProductos = document.querySelector(".inventory-list");

//API
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZnVlZmJ4bGphZ212anFsc3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDI3OTgsImV4cCI6MjA5NjE3ODc5OH0.t0gOmXwM3GQR-DR-_fR0jx2nQAr5fz9w2OwPdj-EDZI";

const ApiProductos = new APIProductos({
  url: "https://dafuefbxljagmvjqlssu.supabase.co/rest/v1/productos",
  headers: {
    apikey: apiKey,
    authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
});

//cerrar popUps
closePopUps();

//renderizar Producto
let esteProducto = null;
function renderObjects(object, container) {
  const objectClass = new producto(
    object,
    "#product-template",
    (thisObject) => {
      esteProducto = thisObject;
      editinputId.value = objectClass.getID();
      editinputArticulo.value = thisObject.articulo;
      editinputPrecio.value = thisObject.precio;
    },
  );
  const objectElement = objectClass.generateObject();
  container.append(objectElement);
}
//renderizar seccion
function renderSection(items) {
  items.forEach((item) => {
    renderObjects(item, listaProductos);
  });
}

//Mostrar Productos
ApiProductos.getProductos()
  .then((data) => {
    renderSection(data);
  })
  .catch((error) => console.log(error.status));

///Formularios
//Formulario editar producto
const editProductForm = new Form({
  PopupSelector: editFormPopup,
  handleFormSubmit: (thisInputs) => {
    ApiProductos.updateProducto(thisInputs);
    esteProducto.updateElement(thisInputs);
    closeModal(editFormPopup);
  },
});
editProductForm.setEventListeners();
