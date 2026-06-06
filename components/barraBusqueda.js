export default class BarraDeBusqueda {
  constructor({ inputBusqueda, contenedorElementos, elemento, elementoName }) {
    this.inputBarraDeBusqueda = document.querySelector(inputBusqueda);
    this.contenedorElementos = document.querySelector(contenedorElementos);
    this.elemento = elemento;
    this.elementoName = elementoName;

    this.setEventListeners();
  }

  buscarElementos(terminoDeBusqueda) {
    const busqueda = terminoDeBusqueda.target.value.toLowerCase();
    const elementos = this.contenedorElementos.querySelectorAll(this.elemento);

    elementos.forEach((item) => {
      const nombre = item
        .querySelector(this.elementoName)
        .textContent.toLowerCase();
      item.style.display = nombre.includes(busqueda) ? "" : "none";
    });
  }

  setEventListeners() {
    this.inputBarraDeBusqueda.addEventListener("input", (event) =>
      this.buscarElementos(event),
    );
  }
}
