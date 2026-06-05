export default class APIProductos {
  #url;
  #headers;

  constructor({ url, headers }) {
    this.#url = url;
    this.#headers = headers;
  }

  #checkResponse(res) {
    if (!res.ok) return Promise.reject(`Error: ${res.status}`);
    if (res.status === 204) return Promise.resolve();

    return res.json();
  }

  async getProductos() {
    const response = await fetch(`${this.#url}?select=*&order=articulo.asc`, {
      headers: this.#headers,
    });
    return await this.#checkResponse(response);
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
    return await this.#checkResponse(response);
  }

  async postProducto(data) {
    const response = await fetch(this.#url, {
      method: "POST",
      headers: { ...this.#headers, Prefer: "return=representation" },
      body: JSON.stringify({
        articulo: data.addArticulo,
        precio: data.addPrecio,
      }),
    });

    return await this.#checkResponse(response);
  }

  async deleteProducto(id) {
    const response = await fetch(`${this.#url}?id=eq.${id}`, {
      method: "DELETE",
      headers: this.#headers,
    });
    return await this.#checkResponse(response);
  }
}
