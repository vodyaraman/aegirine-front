import React, { useState, useEffect } from 'react';
import apiService from '../connection/API/index';

const CreateButton = () => {
  const [buttonText, setButtonText] = useState('Начнём!');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        setButtonText('Повторим!');
      }
    }
  }, []);

  const handleClick = async () => {
    try {
      // Удаляем ключи из localStorage
      localStorage.removeItem('menuData');
      localStorage.removeItem('authToken');

      // Создаем новое соединение
      const response = await apiService.createConnection('restaurant-service');
      window.location.href = response.link;
    } catch (error) {
      console.error('Ошибка при создании:', error);
    }
  };

  return (
    <a>
      <button onClick={handleClick}>{buttonText}</button>
    </a>
  );
};

export default CreateButton;
