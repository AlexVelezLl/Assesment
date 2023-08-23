// Crear una clase para que se instancien los servicios del SDK para productos.
// Que recoja el environment url y que recoja el authorId

class Services {
  constructor(apiUrl, authorId) {
    console.log('apiUrl', apiUrl);
    console.log('authorId', authorId);
    if (!apiUrl || !authorId || Services.instance) { // Singleton pattern
      console.log("IM HERREE");
      return Services.instance;
    }
    console.log("IM HERREE 22");
    Services.instance = this;
    this.apiUrl = apiUrl;
    this.authorId = authorId;
  }

  async getProducts() {
    const response = await fetch(`${this.apiUrl}/products?authorId=${this.authorId}`);
    const data = await response.json();
    return data;
  }

  async getProductById(id) {
    const response = await fetch(`${this.apiUrl}/products/${id}?authorId=${this.authorId}`);
    const data = await response.json();
    return data;
  }

  async createProduct(product) {
    const payload = {
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: product.relaseDate,
      date_revision: product.revisionDate
    }
    const response = await fetch(`${this.apiUrl}/bp/products`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'authorId': this.authorId
      }
    });
    const data = await response.json();
    return data;
  }

  async updateProduct(product) {
    const response = await fetch(`${this.apiUrl}/products/${product.id}?authorId=${this.authorId}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  }

  async deleteProduct(id) {
    const response = await fetch(`${this.apiUrl}/products/${id}?authorId=${this.authorId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
};

export default Services;
