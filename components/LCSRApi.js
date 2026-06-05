export default class APIProductos {
  #url;
  #headers;
  constructor({ url, headers }) {
    this.#url = url;
    this.#headers = headers;
  }

  checkResponse(res) {
    return res.ok ? res.json() : Promise.reject;
    `Error: ${res.status}`;
  }

  getProductos() {
    return fetch(this.#url, { headers: this.#headers }).then((res) =>
      this.checkResponse(res),
    );
  }
}
