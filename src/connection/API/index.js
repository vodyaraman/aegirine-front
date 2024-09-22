import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async createConnection(serviceName) {
    try {
      const response = await this.api.post('/create', { serviceName });
      return response.data; // Возвращаем данные ответа
    } catch (error) {
      this.handleError(error);
    }
  }

  async getConnection(config) {
    try {
      const response = await this.api.get('/get-link', config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Установка токена в заголовки
  setToken(token) {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common['Authorization'];
    }
  }

  // Создание новой ссылки (client-links)
  async createClientLink(config = {}) {
    try {
      const response = await this.api.post('/client-link', {}, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }  

  async initializeMenu(config = {}) {
    try {
      const response = await this.api.post('/init', {}, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Создание меню (create)
  async createMenu(data) {
    try {
      const response = await this.api.post('/create', data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Обновление меню (update)
  async updateMenu(data, config = {}) {
    try {
      const response = await this.api.put('/update', data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Удаление меню
  async deleteMenu(menuId) {
    try {
      const response = await this.api.delete(`/delete/${menuId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Получение данных меню
  async getMenu(menuId) {
    try {
      const response = await this.api.get(`/menu/${menuId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Загрузка изображения
  async uploadImage(formData, config) {
    try {
      // Отправляем FormData через POST-запрос
      const response = await this.api.post('/images', formData, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Обработка ошибок
  handleError(error) {
    if (error.response) {
      console.error('API Error:', error.response.data.message || error.message);
    } else {
      console.error('Network Error:', error.message);
    }
  }
}

export default new ApiService('http://localhost:3030');
