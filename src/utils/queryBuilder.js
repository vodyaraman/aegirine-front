import apiService from "../connection/API/index.js";
import { jwtDecode } from 'jwt-decode';

class QueryBuilder {
  constructor() {
    this.tokenKey = 'authToken'; // Ключ для хранения JWT-токена
    this.menuKey = 'savedMenu'; // Ключ для хранения данных меню в localStorage
  }

  // Получение токена из localStorage
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Сохранение токена в localStorage
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Декодирование JWT и получение connectionId
  decodeToken() {
    const token = this.getToken();
    if (!token) {
      throw new Error('Токен не найден');
    }

    try {
      const decoded = jwtDecode(token);
      return decoded.connectionId;
    } catch (error) {
      console.error('Ошибка декодирования JWT:', error);
      return null;
    }
  }

  // Инициализация проекта (проверка, нужно ли создавать новую ссылку или использовать старую)
  async initializeProject() {
    if (this.hasToken()) {
      console.log('Проект уже инициализирован, используем существующую ссылку.');
      apiService.setToken(this.getToken()); // Устанавливаем токен для всех запросов
      return;
    }

    try {
      const connectionId = 'menu123'; // Пример connectionId
      const clientUrl = 'https://example.com/menu123'; // Пример URL
      const response = await apiService.createClientLink(connectionId, clientUrl);

      // Получаем токен из ответа и сохраняем его
      const token = response.jwtToken;
      this.setToken(token);
      apiService.setToken(token);
      console.log('Проект успешно инициализирован.');
    } catch (error) {
      console.error('Ошибка при инициализации проекта:', error);
    }
  }

  // Создание или обновление меню
  async saveMenu(menuData) {
    const token = this.getToken(); // Получаем токен для заголовка
    if (!token) {
      throw new Error('Не удалось получить токен для сохранения меню');
    }

    try {
      console.log('Сохраняем меню...');

      // Отправляем PUT запрос на /update с заголовком Authorization
      const response = await apiService.updateMenu(menuData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('Меню успешно обновлено.');
      return response;
    } catch (error) {
      console.error('Ошибка при сохранении меню:', error);
      throw error;
    }
  }

  // Метод для сохранения меню в localStorage
  saveMenuToLocalStorage(menuData) {
    localStorage.setItem(this.menuKey, JSON.stringify(menuData));
  }

  // Метод для загрузки меню из localStorage
  loadMenuFromLocalStorage() {
    const savedMenu = localStorage.getItem(this.menuKey);
    return savedMenu ? JSON.parse(savedMenu) : null;
  }

  // Обновление данных меню из базы данных
  async updateMenu() {
    const token = this.getToken();
    if (!token) {
      throw new Error('Не удалось получить токен для обновления меню');
    }

    try {
      const menuData = await apiService.getMenu(null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.saveMenuToLocalStorage(menuData);
      console.log('Меню обновлено и загружено в localStorage.');
      return menuData;
    } catch (error) {
      console.error('Ошибка при обновлении меню:', error);
    }
  }
  async getMenu() {
    const token = this.getToken();  // Получаем токен из localStorage через queryBuilder

    if (!token) {
      throw new Error('Токен не найден');
    }

    try {
      const response = await apiService.getMenu({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response;
    } catch (error) {
      console.error('Ошибка при получении меню:', error);
      throw error;
    }
  }
}

export default new QueryBuilder();