import React, { useState, useEffect } from 'react';
import queryBuilder from '../utils/queryBuilder';

export const Background = ({ imageId }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await queryBuilder.getImage(imageId);
        setImageSrc(image);
      } catch (error) {
        console.error('Ошибка при получении фона:', error);
      }
    };

    if (imageId) {
      fetchImage();
    }
  }, [imageId]);

  if (!imageSrc) {
    return <></>;
  }

  return <img className="background-image" src={imageSrc} alt="Background" />;
};
