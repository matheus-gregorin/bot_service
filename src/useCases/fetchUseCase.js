const token = sessionStorage.getItem('x-t')
export default class ApiService {

    constructor(baseURL) {
      this.baseURL = baseURL || ''; // URL base para as requisições
    }
  
    // Método para realizar uma requisição GET
    async get(endpoint, params = {}) {
      const url = this.buildUrl(endpoint, params);
      return this.request(url, 'GET');
    }
  
    // Método para realizar uma requisição POST
    async post(endpoint, data) {
      const url = this.buildUrl(endpoint);
      return this.request(url, 'POST', data);
    }
  
    // Método para realizar uma requisição PUT
    async put(endpoint, data) {
      const url = this.buildUrl(endpoint);
      return this.request(url, 'PUT', data);
    }
  
    // Método para realizar uma requisição DELETE
    async delete(endpoint, params = {}) {
      const url = this.buildUrl(endpoint, params);
      return this.request(url, 'DELETE');
    }
  
    // Método para construir a URL com parâmetros
    buildUrl(endpoint, params = {}) {
      const url = new URL(endpoint, this.baseURL);
  
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
      });
  
      return url.toString();
    }
  
    // Método genérico para realizar a requisição
    async request(url, method, body = null) {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: body ? JSON.stringify(body) : null,
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Erro na requisição');
        }
  
        return data;
      } catch (error) {
        console.error('Erro na requisição:', error);
        return {
          success: false,
          message: error.message
        };
      }
    }
  }
  