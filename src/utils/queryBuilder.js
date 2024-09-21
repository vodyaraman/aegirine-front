import apiService from "../connection/API/index.js";
import { jwtDecode } from 'jwt-decode';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class QueryBuilder {
  constructor() {
    this.tokenKey = 'authToken'; // Ключ для хранения JWT-токена
    this.menuKey = 'savedMenu'; // Ключ для хранения данных меню в localStorage

    // Инициализация S3 клиент для работы с Yandex Object Storage
    this.s3 = new S3Client({
      region: 'ru-central1',
      credentials: {
        accessKeyId: import.meta.env.PUBLIC_YANDEX_ACCESS_KEY,
        secretAccessKey: import.meta.env.PUBLIC_YANDEX_SECRET_KEY,
      },
      endpoint: 'https://storage.yandexcloud.net',  // Yandex Object Storage endpoint
      forcePathStyle: true, // Для работы с Yandex Object Storage
    });
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
  async initializeMenu() {
    const token = this.getToken();
    if (!token) {
      throw new Error('Токен не найден');
    }

    try {
      // Отправляем запрос на инициализацию меню
      const response = await apiService.initializeMenu({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Если меню успешно инициализировано, возвращаем данные
      if (response) {
        console.log('Меню успешно инициализировано:', response);
        return response;
      }
    } catch (error) {
      console.error('Ошибка при инициализации меню:', error);
      throw error;
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
  saveMenuTolocalStorage(menuData) {
    localStorage.setItem(this.menuKey, JSON.stringify(menuData));
  }

  // Метод для загрузки меню из localStorage
  loadMenuFromlocalStorage() {
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
      this.saveMenuTolocalStorage(menuData);
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

  async uploadImage(imageFile, imageId, description = '') {
    const token = this.getToken();
    if (!token) {
      throw new Error('Не удалось получить токен для загрузки изображения');
    }

    try {
      // Создаем объект FormData
      const formData = new FormData();
      formData.append('image', imageFile); // Добавляем файл изображения
      formData.append('imageId', imageId); // Добавляем imageId
      formData.append('description', description); // Добавляем описание

      // Отправляем FormData через API
      const response = await apiService.uploadImage(formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Указываем корректный Content-Type
        }
      });

      console.log('Изображение успешно загружено.');
      return response;
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
      throw error;
    }
  }

  // Получение изображения
  async getImage(imageId) {
    const bucketName = 'coffee-menu-images-storage';
    console.log('Access Key:', import.meta.env.PUBLIC_YANDEX_ACCESS_KEY);
    console.log('Secret Key:', import.meta.env.PUBLIC_YANDEX_SECRET_KEY);


    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: imageId,
      });

      // Генерация временной ссылки на объект (можно настроить время действия)
      const imageUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

      return imageUrl;  // Возвращаем временную ссылку на изображение
    } catch (error) {
      console.error('Ошибка при получении изображения:', error);
      throw error;
    }
  }

  // Удаление изображения
  async deleteImage(imageId) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Не удалось получить токен для удаления изображения');
    }

    try {
      const response = await apiService.deleteImage(imageId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Изображение успешно удалено.');
      return response;
    } catch (error) {
      console.error('Ошибка при удалении изображения:', error);
      throw error;
    }
  }
}

export default new QueryBuilder();
