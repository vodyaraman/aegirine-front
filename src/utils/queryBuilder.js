import apiService from "../connection/API/index.js"
import jwt from 'jsonwebtoken';

class QueryBuilder {
  constructor() {
    this.tokenKey = 'jwtToken'; // Ключ для хранения JWT-токена
    this.menuKey = 'savedMenu'; // Ключ для хранения данных меню в localStorage
  }

  // Проверка наличия токена в localStorage
  hasToken() {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Получение токена из localStorage
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Сохранение токена в localStorage
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Удаление токена из localStorage
  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  // Декодирование JWT и получение connectionId
  decodeToken() {
    const token = this.getToken();
    if (!token) {
      throw new Error('Токен не найден');
    }

    try {
      const decoded = jwt.decode(token); // Расшифровываем токен
      return decoded.connectionId; // Возвращаем connectionId из токена
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
      // Создаем новую ссылку через API (например, первый раз)
      const connectionId = 'menu123'; // Пример connectionId
      const clientUrl = 'https://example.com/menu123'; // Пример URL
      const response = await apiService.createClientLink(connectionId, clientUrl);

      // Получаем токен из ответа и сохраняем его
      const token = response.jwtToken; // Предположительно, сервер возвращает JWT-токен
      this.setToken(token);
      apiService.setToken(token);
      console.log('Проект успешно инициализирован.');
    } catch (error) {
      console.error('Ошибка при инициализации проекта:', error);
    }
  }

  // Метод для создания запроса на создание меню
  buildCreateMenuRequest({ title, drinkSizes, drinks, imageId, logoId, mascotId }) {
    return {
      title,
      drink_sizes: drinkSizes || [],
      drinks: drinks || [],
      imageId,
      logoId,
      mascotId,
    };
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
  async updateMenu(menuId) {
    try {
      const menuData = await apiService.getMenu(menuId);
      this.saveMenuToLocalStorage(menuData);
      console.log('Меню обновлено и загружено в localStorage.');
      return menuData;
    } catch (error) {
      console.error('Ошибка при обновлении меню:', error);
    }
  }

  // Метод для удаления меню из localStorage (если нужно сбросить)
  clearMenuFromLocalStorage() {
    localStorage.removeItem(this.menuKey);
  }
}

export default new QueryBuilder();
