export default class Searcher {
  constructor(inputSelector, containerSelector, itemSelector, nameSelector) {
    this._input = document.querySelector(inputSelector);
    this._container = document.querySelector(containerSelector);
    this._itemSelector = itemSelector;
    this._nameSelector = nameSelector;

    this.setEventListeners();
  }

  _filterList(event) {
    const term = event.target.value.toLowerCase();
    const items = this._container.querySelectorAll(this._itemSelector);

    items.forEach((item) => {
      const name = item
        .querySelector(this._nameSelector)
        .textContent.toLowerCase();

      // Si incluye el término, lo mostramos, si no, lo ocultamos
      item.style.display = name.includes(term) ? "" : "none";
    });
  }

  setEventListeners() {
    this._input.addEventListener("input", (e) => this._filterList(e));
  }
}
