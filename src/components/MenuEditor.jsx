import React, { useState } from 'react';
import { Background } from './Background';
import { EditDrinks, EditTitle, EditSizes } from './menuComponents/EditComponents';
import { TitleButtons, SizesButtons, DrinksButtons } from './menuComponents/MenuEditorButtons';

const MenuEditor = () => {
    const [menuData, setMenuData] = useState({
        title: {
            text: '',
            font: 'Rubik',
            fontSize: '35px',
            color: '#faeee6',
        },
        drink_sizes: ['Маленький', 'Средний', 'Большой'],
        drinks: [
            {
                name: 'Имбирный чай',
                price: 270,
                description: '',
                backgroundColor: '#F5F5DC',
            },
        ],
        imageId: 'logo123',
        mascotId: 'mascot123',
        backgroundImage: 'https://fsfera.ru/images/pages/articles/kraski_oseni_v_vashem_obektive3.jpg',
    });

    // Функция для обновления любого поля
    const updateField = (field, updatedValue) => {
        setMenuData(prev => ({
            ...prev,
            [field]: updatedValue,
        }));
    };

    // Добавление элемента в массив (универсальная функция)
    const handleAdd = (field, newItem) => {
        updateField(field, [...menuData[field], newItem]);
    };

    // Удаление элемента из массива по индексу (универсальная функция)
    const handleRemove = (field, index) => {
        updateField(field, menuData[field].filter((_, i) => i !== index));
    };

    // Обновление заголовка
    const handleTitleChange = (newText) => {
        updateField('title', { ...menuData.title, text: newText });
    };

    // Добавление заголовка
    const handleAddTitle = () => {
        updateField('title', { ...menuData.title, text: 'Новый тайтл' });
    };

    // Очистка заголовка
    const handleRemoveTitle = () => {
        updateField('title', { ...menuData.title, text: '' });
    };

    // Изменение размера напитка
    const handleSizeChange = (index, newSize) => {
        const updatedSizes = [...menuData.drink_sizes];
        updatedSizes[index] = newSize;
        updateField('drink_sizes', updatedSizes);
    };

    // Изменение данных напитка
    const handleDrinkChange = (index, field, value) => {
        const updatedDrinks = [...menuData.drinks];
        updatedDrinks[index] = { ...updatedDrinks[index], [field]: value };
        updateField('drinks', updatedDrinks);
    };

    return (
        <div className="menu-editor">
            <Background image={menuData.backgroundImage} />

            <EditTitle title={menuData.title} onChange={handleTitleChange} />
            <TitleButtons
                title={menuData.title}
                onAddTitle={handleAddTitle}
                onRemoveTitle={handleRemoveTitle}
            />

            <EditSizes drinkSizes={menuData.drink_sizes} onSizeChange={handleSizeChange} />
            <SizesButtons
                drinkSizes={menuData.drink_sizes}
                onAddSize={() => handleAdd('drink_sizes', 'Новый размер')}
                onRemoveSize={() => handleRemove('drink_sizes', menuData.drink_sizes.length - 1)}
            />

            <EditDrinks drinks={menuData.drinks} onDrinkChange={handleDrinkChange} />
            <DrinksButtons
                drinks={menuData.drinks}
                onAddDrink={() =>
                    handleAdd('drinks', {
                        name: 'Новый напиток',
                        price: 0,
                        description: '',
                        backgroundColor: '#FFFFFF',
                    })
                }
                onRemoveDrink={() => handleRemove('drinks', menuData.drinks.length - 1)}
            />
        </div>
    );
};

export default MenuEditor;