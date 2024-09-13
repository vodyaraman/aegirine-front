import React, { useState, useEffect } from 'react';

const Options = () => {
    const [selectedElement, setSelectedElement] = useState(null);  // Хранение данных о выбранном элементе

    useEffect(() => {
        // Функция для обработки кликов
        const handleClick = (event) => {
            let target = event.target;

            // Логируем элемент, по которому кликнули (для отладки)
            console.log("Клик по элементу: ", target);

            // Ищем ближайший родительский элемент с нужным классом
            const closestElement = target.closest('.menu-title, .menu-drink-item, .menu-size, .drink-name-input-field, .size-input-field, .title-input-field');
            if (closestElement) {
                setSelectedElement(closestElement);  // Устанавливаем выбранный элемент
                console.log("Ближайший элемент: ", closestElement);
            }
        };

        // Навешиваем слушатель события click
        document.addEventListener('click', handleClick);

        // Чистим слушатели событий при размонтировании компонента
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    if (!selectedElement) {
        return <div className="options">Нажмите на элемент, чтобы увидеть его настройки</div>;
    }

    return (
        <div className="options">
            <h2>Настройки выбранного элемента</h2>

            {/* Пример вывода информации о выбранном элементе */}
            <div className="options__group">
                <label>Класс элемента:</label>
                <span>{selectedElement.className}</span>
            </div>
            {selectedElement.value && (
                <div className="options__group">
                    <label>Значение инпута:</label>
                    <span>{selectedElement.value}</span>
                </div>
            )}
            {selectedElement.style.fontFamily && (
                <div className="options__group">
                    <label>Шрифт:</label>
                    <span>{selectedElement.style.fontFamily}</span>
                </div>
            )}
            {selectedElement.style.fontSize && (
                <div className="options__group">
                    <label>Размер шрифта:</label>
                    <span>{selectedElement.style.fontSize}</span>
                </div>
            )}
            {selectedElement.style.color && (
                <div className="options__group">
                    <label>Цвет текста:</label>
                    <span>{selectedElement.style.color}</span>
                </div>
            )}
        </div>
    );
};

export default Options;
