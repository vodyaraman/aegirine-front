import React, { useState, useEffect } from 'react';

const InputField = ({ label, type = "text", value, onChange }) => {
    const [inputValue, setInputValue] = useState(value); // Локальный стейт

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="options__group">
            <label>{label}:</label>
            <input
                type={type}
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};


const Options = ({ menuData, setMenuData }) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [elementData, setElementData] = useState(null);
    const [elementIndex, setElementIndex] = useState(null);

    // Словарь для сопоставления классов с контейнерами
    const classToContainerMap = {
        'title-input-field': 'title',
        'size-input-field': 'drink_sizes',
        'drink-name-input-field': 'drinks',
        'drink-price-input-field': 'drinks',
    };

    // Словарь для сопоставления контейнеров с данными в menuData
    const containerToDataMap = {
        'title': menuData.title
            ? {
                content: menuData.title.content,
                font: menuData.title.font,
                size: menuData.title.size,
                color: menuData.title.color,
            }
            : null,
        'drink_sizes': menuData.drink_sizes ? menuData.drink_sizes : [],
        'drinks': menuData.drinks
            ? menuData.drinks.map(drink => ({
                content: drink.content,
                color: drink.color,
                font: drink.font,
                size: drink.size,
                price: drink.price,
                backgroundColor: drink.backgroundColor,
            }))
            : [],
    };

    const mapElementToData = (inputClass) => {
        const container = classToContainerMap[inputClass];
        return containerToDataMap[container];
    };

    useEffect(() => {
        const handleClick = (event) => {
            const target = event.target;
    
            // Проверяем, находится ли клик внутри .menu-editor
            const isClickInsideMenuEditor = target.closest('.menu-editor');
    
            if (!isClickInsideMenuEditor) {
                // Если клик вне меню, ничего не делаем
                return;
            }
    
            // Находим нужный класс элемента
            const inputClass = Object.keys(classToContainerMap).find(className =>
                target.closest(`.${className}`)
            );
    
            if (inputClass) {
                // Если клик по целевому элементу, обрабатываем его
                const element = target.closest(`.${inputClass}`);
                if (!element) return;
    
                const container = classToContainerMap[inputClass];
                const data = mapElementToData(inputClass);
    
                setSelectedElement(element); // Устанавливаем выбранный элемент
    
                const parent = element.closest('.menu-drinks-input'); // Находим родительский контейнер для напитков
    
                // Обновляем данные для размера напитков
                if (container === 'drink_sizes') {
                    const sizeIndex = [...parent.children].indexOf(element);
                    setElementIndex(sizeIndex);
                    setElementData(data[sizeIndex]);
                }
                // Обновляем данные для напитков
                else if (container === 'drinks') {
                    const drinkIndex = [...parent.querySelectorAll('.menu-drink-item-input')].indexOf(element.closest('.menu-drink-item-input'));
                    setElementIndex(drinkIndex);
                    setElementData(data[drinkIndex]);
                } 
                else {
                    setElementData(data); // Для заголовков или других элементов
                }
            } else {
                // Если клик не по целевому элементу, но внутри .menu-editor, очищаем меню
                setSelectedElement(null);
                setElementData(null);
                setElementIndex(null);
            }
        };
    
        document.addEventListener('click', handleClick);
    
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [menuData]);    

    const handleInputChange = (field, value) => {
        const updatedMenuData = { ...menuData };

        // Если выбран заголовок
        if (selectedElement && selectedElement.classList.contains('title-input-field')) {
            updatedMenuData.title = {
                ...updatedMenuData.title,
                [field]: value
            };
        }

        // Если выбраны размеры напитков
        if (selectedElement && selectedElement.classList.contains('size-input-field')) {
            updatedMenuData.drink_sizes[elementIndex] = value;  // Обновляем конкретный размер напитка
        }

        // Если выбраны напитки
        if (selectedElement && (selectedElement.classList.contains('drink-name-input-field') || selectedElement.classList.contains('drink-price-input-field'))) {
            updatedMenuData.drinks[elementIndex] = {
                ...updatedMenuData.drinks[elementIndex],
                [field]: value  // Обновляем конкретное поле напитка по индексу
            };
        }

        setMenuData(updatedMenuData);
    };

    // Функция для рендеринга полей в зависимости от выбранного элемента
    const renderFields = () => {
        if (!elementData) return null;

        const fields = [];

        if (selectedElement.classList.contains('title-input-field')) {
            fields.push(
                <InputField
                    key="title-content"
                    label="Текст заголовка"
                    value={elementData.content || ''}
                    onChange={(value) => handleInputChange('content', value)}
                />,
                <InputField
                    key="title-font"
                    label="Шрифт заголовка"
                    value={elementData.font || ''}
                    onChange={(value) => handleInputChange('font', value)}
                />,
                <InputField
                    key="title-size"
                    label="Размер шрифта"
                    value={elementData.size || ''}
                    onChange={(value) => handleInputChange('size', value)}
                />,
                <InputField
                    key="title-color"
                    label="Цвет заголовка"
                    type="color"
                    value={elementData.color || '#000000'}
                    onChange={(value) => handleInputChange('color', value)}
                />
            );
        }

        if (selectedElement.classList.contains('drink-name-input-field') || selectedElement.classList.contains('drink-price-input-field')) {
            fields.push(
                <InputField
                    key="drink-content"
                    label="Название напитка"
                    value={elementData.content || ''}
                    onChange={(value) => handleInputChange('content', value)}
                />,
                <InputField
                    key="drink-color"
                    label="Цвет напитка"
                    type="color"
                    value={elementData.color || '#000000'}
                    onChange={(value) => handleInputChange('color', value)}
                />,
                <InputField
                    key="drink-font"
                    label="Шрифт напитка"
                    value={elementData.font || ''}
                    onChange={(value) => handleInputChange('font', value)}
                />,
                <InputField
                    key="drink-size"
                    label="Размер шрифта"
                    value={elementData.size || ''}
                    onChange={(value) => handleInputChange('size', value)}
                />,
                <InputField
                    key="drink-price"
                    label="Цена напитка"
                    value={elementData.price || 0}
                    onChange={(value) => handleInputChange('price', value)}
                />,
                <InputField
                    key="drink-background"
                    label="Цвет фона напитка"
                    type="color"
                    value={elementData.backgroundColor || '#ffffff'}
                    onChange={(value) => handleInputChange('backgroundColor', value)}
                />
            );
        }

        return fields;
    };

    if (!selectedElement || !elementData) {
        return <div className="options">Нажмите на элемент, чтобы увидеть его настройки</div>;
    }

    return (
        <div className="options">
            <h2>Настройки выбранного элемента</h2>
            <div className="options__container">
                {renderFields()}
            </div>
        </div>
    );
};

export default Options;
