export default class APIProductos {
  #url;
  #headers;
  constructor({ url, headers }) {
    this.#url = url;
    this.#headers = headers;
  }

  checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  async getProductos() {
    const response = await fetch(`${this.#url}?select=*&order=id.asc`, {
      headers: this.#headers,
    });
    return await this.checkResponse(response);
  }

  async updateProducto(data) {
    const response = await fetch(`${this.#url}?id=eq.${data.editId}`, {
      method: "PATCH",
      headers: { ...this.#headers, Prefer: "return=representation" },
      body: JSON.stringify({
        id: data.editId,
        articulo: data.editArticulo,
        precio: data.editPrecio,
      }),
    });
    return await this.checkResponse(response);
  }
}
