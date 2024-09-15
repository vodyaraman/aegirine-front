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

  // Установка токена в заголовки
  setToken(token) {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common['Authorization'];
    }
  }

  // Создание новой ссылки (client-links)
  async createClientLink(connectionId, clientUrl) {
    try {
      const response = await this.api.post('/client-links', {
        connectionId,
        clientUrl,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Получение ссылки (client-links)
  async getClientLink(connectionId) {
    try {
      const response = await this.api.get(`/client-links/${connectionId}`);
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


  // Удаление меню (delete)
  async deleteMenu(menuId) {
    try {
      const response = await this.api.delete(`/delete/${menuId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Получение данных меню
  async getMenu(config) {
    try {
      const response = await this.api.get(`/menu`, config); // config передается с заголовками
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }


  // Загрузка изображения
  async uploadImage(imageData) {
    try {
      const formData = new FormData();
      formData.append('image', imageData);

      const response = await this.api.post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
