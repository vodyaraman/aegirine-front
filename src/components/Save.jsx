import React, { useState, useEffect } from 'react';

const Save = ({ menuData, onSave }) => {
    const [isVisible, setIsVisible] = useState(false); // Состояние для отображения уведомления
    const [lastSavedData, setLastSavedData] = useState(menuData); // Последний сохраненный вариант меню

    // Проверка на наличие изменений
    useEffect(() => {
        const hasChanges = JSON.stringify(menuData) !== JSON.stringify(lastSavedData);
        setIsVisible(hasChanges);
    }, [menuData, lastSavedData]);

    // Обработчик нажатия на кнопку "Сохранить"
    const handleSaveClick = () => {
        onSave(); // Вызываем функцию для отправки данных на сервер
        setLastSavedData(menuData); // Обновляем последний сохраненный вариант меню
        setIsVisible(false); // Скрываем уведомление
    };

    return (
        <>
            {isVisible && (
                <div className="save-notification">
                    <p>Изменения не сохранены</p>
                    <button onClick={handleSaveClick} className="save-button">
                        Сохранить
                    </button>
                </div>
            )}
        </>
    );
};

export default Save;
