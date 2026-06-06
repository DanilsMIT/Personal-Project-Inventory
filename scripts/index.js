import producto from "../components/ProductoClass.js";
import Form from "../components/FormClass.js";
import APIProductos from "../components/LCSRApi.js";
import { closePopUps, closeModal, openModal } from "../components/utils.js";
import {
  listaProductos,
  editFormPopup,
  editinputId,
  editinputArticulo,
  editinputPrecio,
  addFormPopup,
  addFormOpenButton,
  confirmPopup,
} from "../components/constants.js";
import ConfirmAction from "../components/ConfirmPopUp.js";
import BarraDeBusqueda from "../components/barraBusqueda.js";

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

//Confirmar Accion
const confirmDeleteWindow = new ConfirmAction(confirmPopup);
//renderizar Producto
let esteProducto = null;
function renderObject(object, container) {
  const objectClass = new producto(
    object,
    "#product-template",
    (thisObject) => {
      esteProducto = thisObject;
      editinputId.value = thisObject.getID();
      editinputArticulo.value = thisObject.articulo;
      editinputPrecio.value = thisObject.precio;
    },
    (thisObject) => {
      confirmDeleteWindow.window(() => {
        ApiProductos.deleteProducto(thisObject.getID());
        thisObject.removeElement();
      });
    },
  );
  const objectElement = objectClass.generateObject();
  container.prepend(objectElement);
}
//renderizar seccion
function renderSection(items) {
  items.reverse().forEach((item) => {
    renderObject(item, listaProductos);
  });
}

//Obtener Productos
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

//Formulario agregar producto
addFormOpenButton.addEventListener("click", () => {
  openModal(addFormPopup);
});

const addProductForm = new Form({
  PopupSelector: addFormPopup,
  handleFormSubmit: (thisInputs) => {
    ApiProductos.postProducto(thisInputs).then((data) => {
      renderObject(data[0], listaProductos);
    });
    addProductForm.closeForm();
  },
});

//barrra de busqueda
const productSearcher = new BarraDeBusqueda({
  inputBusqueda: "#busqueda",
  contenedorElementos: ".inventory-list",
  elemento: ".product-item",
  elementoName: ".product-item__name",
});
