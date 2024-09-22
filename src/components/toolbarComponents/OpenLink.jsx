import React, { useState, useEffect } from 'react';
import queryBuilder from '../../utils/queryBuilder';  // Предположим, что это путь к вашему queryBuilder

export const OpenLink = () => {
    const [link, setLink] = useState("http://localhost:4321/client"); // Значение по умолчанию

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const response = await queryBuilder.getClientLink();  // Вызываем метод из queryBuilder
                setLink(response.clientUrl);  // Устанавливаем ссылку из ответа сервера
            } catch (error) {
                console.error('Ошибка при получении ссылки:', error);
            }
        };

        fetchLink();  // Вызываем функцию при монтировании компонента
    }, []);

    const handleOpen = () => {
        window.open(link, '_blank');
    };

    return (
        <div className="tool link" onClick={handleOpen}>
            <img src="/open-window.png" draggable="false" alt="Open Link" />
        </div>
    );
};
