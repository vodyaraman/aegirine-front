import React from 'react';
import apiService from '../connection/API/index';

const CreateButton = ({ buttonText }) => {
  const handleClick = async () => {
    try {
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

