import React, { useState, useEffect } from 'react';

const Options = ({ menuData, setMenuData }) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [elementData, setElementData] = useState(null);

    // Словарь для сопоставления классов с контейнерами
    const classToContainerMap = {
        'title-input-field': 'title',
        'size-input-field': 'drink_sizes',
        'drink-name-input-field': 'drinks',
    };

    // Словарь для сопоставления контейнеров с данными в menuData
    const containerToDataMap = {
        'title': {
            content: menuData.title.content,
            font: menuData.title.font,
            size: menuData.title.size,  // Исправлено на size
            color: menuData.title.color,
        },
        'drink_sizes': menuData.drink_sizes,
        'drinks': menuData.drinks.map(drink => ({
            content: drink.content,
            color: drink.color,
            font: drink.font,
            size: drink.size,
            price: drink.price,
            backgroundColor: drink.backgroundColor,
        })),
    };

    // Функция для маппинга свойств в элемент
    const mapElementToData = (inputClass) => {
        const container = classToContainerMap[inputClass];
        return containerToDataMap[container];
    };

    useEffect(() => {
        const handleClick = (event) => {
            const target = event.target;

            // Найдём ближайший инпут по классу
            const inputClass = Object.keys(classToContainerMap).find(className =>
                target.closest(`.${className}`)
            );

            if (inputClass) {
                const data = mapElementToData(inputClass);

                setSelectedElement(target.closest(`.${inputClass}`)); // Устанавливаем выбранный элемент
                setElementData(data);  // Устанавливаем данные для отображения
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [menuData]);

    // Функция для изменения значений в menuData
    const handleInputChange = (field, value) => {
        const updatedMenuData = { ...menuData };

        // Если выбран заголовок
        if (selectedElement && selectedElement.classList.contains('title-input-field')) {
            updatedMenuData.title[field] = value;  // Исправлено на content и size
        }

        // Если выбраны размеры напитков
        if (selectedElement && selectedElement.classList.contains('size-input-field')) {
            const sizeIndex = [...selectedElement.parentElement.children].indexOf(selectedElement);
            updatedMenuData.drink_sizes[sizeIndex] = value;
        }

        // Если выбраны напитки
        if (selectedElement && selectedElement.classList.contains('drink-name-input-field')) {
            const drinkIndex = [...selectedElement.parentElement.children].indexOf(selectedElement);
            updatedMenuData.drinks[drinkIndex][field] = value;
        }

        setMenuData(updatedMenuData);
    };

    if (!selectedElement) {
        return <div className="options">Нажмите на элемент, чтобы увидеть его настройки</div>;
    }

    return (
        <div className="options">
            <h2>Настройки выбранного элемента</h2>

            {/* Настройки для заголовка */}
            {selectedElement.classList.contains('title-input-field') && (
                <>
                    <div className="options__group">
                        <label>Текст заголовка:</label>
                        <input
                            type="text"
                            value={elementData.content}  // Используем content вместо text
                            onChange={(e) => handleInputChange('content', e.target.value)}
                        />
                    </div>
                    <div className="options__group">
                        <label>Шрифт заголовка:</label>
                        <input
                            type="text"
                            value={elementData.font}
                            onChange={(e) => handleInputChange('font', e.target.value)}
                        />
                    </div>
                    <div className="options__group">
                        <label>Размер шрифта:</label>
                        <input
                            type="text"
                            value={elementData.size}  // Используем size вместо fontSize
                            onChange={(e) => handleInputChange('size', e.target.value)}
                        />
                    </div>
                    <div className="options__group">
                        <label>Цвет заголовка:</label>
                        <input
                            type="color"
                            value={elementData.color}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                        />
                    </div>
                </>
            )}

            {/* Настройки для напитков */}
            {selectedElement.classList.contains('drink-name-input-field') && (
                <>
                    <div className="options__group">
                        <label>Название напитка:</label>
                        <input
                            type="text"
                            value={elementData.content}  // Используем content вместо name
                            onChange={(e) => handleInputChange('content', e.target.value)}
                        />
                    </div>
                    <div className="options__group">
                        <label>Цвет напитка:</label>
                        <input
                            type="color"
                            value={elementData.color}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                        />
                    </div>
                    <div className="options__group">
                        <label>Шрифт напитка:</label>
                        <input
                            type="text"
                            value={elementData.font}
                            onChange={(e) => handleInputChange('font', e.target.value)}
                        />
                    </div>
                    <div className="options__group">
                        <label>Размер шрифта:</label>
                        <input
                            type="text"
                            value={elementData.size}
                            onChange={(e) => handleInputChange('size', e.target.value)}
                        />
                    </div>
                    <div className="options__group">
                        <label>Цена напитка:</label>
                        <input
                            type="number"
                            value={elementData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                        />
                    </div>
                    <div className="options__group">
                        <label>Цвет фона напитка:</label>
                        <input
                            type="color"
                            value={elementData.backgroundColor}
                            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Options;
