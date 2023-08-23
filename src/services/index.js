// Crear una clase para que se instancien los servicios del SDK para productos.
// Que recoja el environment url y que recoja el authorId

class Services {
  constructor(apiUrl, authorId) {
    if (!apiUrl || !authorId || Services.instance) { // Singleton pattern
      return Services.instance;
    }
    Services.instance = this;
    this.apiUrl = apiUrl;
    this.authorId = authorId;
  }

  async getProducts() {
    if (!this.apiUrl || !this.authorId) {
      return [];
    }
    const response = await fetch(`${this.apiUrl}/bp/products`, {
      headers: {
        'Content-Type': 'application/json',
        'authorId': this.authorId
      }
    });
    const data = await response.json();
    return (data || []).map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      releaseDate: product.date_release?.split('T')[0] || null,
      revisionDate: product.date_revision?.split('T')[0] || null
    }));
  }

  async createProduct(product) {
    const payload = {
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: product.releaseDate,
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

  async deleteProduct(id) {
    const response = await fetch(`${this.apiUrl}/bp/products?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorId': this.authorId
      }
    });
    const data = await response.json();
    return data;
  }
};

export default Services;
