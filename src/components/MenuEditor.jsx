import React, { useState } from 'react';
import { Background } from './Background';
import { EditDrinks, EditTitle, EditSizes } from './menuComponents/EditComponents';
import { TitleButtons, SizesButtons, DrinksButtons } from './menuComponents/MenuEditorButtons';
import Options from './Options';

const MenuEditor = () => {
    const [menuData, setMenuData] = useState({
        title: {
            text: '',
            font: 'Rubik',
            fontSize: '35px',
            color: '#faeee6',
        },
        showTitle: true, // Управление видимостью заголовка
        drink_sizes: ['Маленький', 'Средний', 'Большой'],
        drinks: [
            {
                name: 'Имбирный чай',
                price: 270,
                description: '',
                backgroundColor: '#ffffffcf',
            },
        ],
        imageId: 'logo123',
        mascotId: 'mascot123',
        backgroundImage: 'https://img.goodfon.ru/original/2560x1600/0/a4/lodka-priroda-peyzazh-ozero.jpg',
    });

    const updateField = (field, updatedValue) => {
        setMenuData(prev => ({
            ...prev,
            [field]: updatedValue,
        }));
    };

    const handleAdd = (field, newItem) => {
        updateField(field, [...menuData[field], newItem]);
    };

    const handleRemove = (field, index) => {
        updateField(field, menuData[field].filter((_, i) => i !== index));
    };

    const handleTitleChange = (newText) => {
        updateField('title', { ...menuData.title, text: newText });
    };

    const handleAddTitle = () => {
        updateField('title', { ...menuData.title, text: 'Новый тайтл' });
        updateField('showTitle', true); // Показываем заголовок
    };

    const handleRemoveTitle = () => {
        updateField('title', { ...menuData.title, text: '' });
        updateField('showTitle', false); // Скрываем заголовок
    };

    const handleSizeChange = (index, newSize) => {
        const updatedSizes = [...menuData.drink_sizes];
        updatedSizes[index] = newSize;
        updateField('drink_sizes', updatedSizes);
    };

    const handleDrinkChange = (index, field, value) => {
        const updatedDrinks = [...menuData.drinks];
        updatedDrinks[index] = { ...updatedDrinks[index], [field]: value };
        updateField('drinks', updatedDrinks);
    };

    return (
        <>
            <div className="menu-editor">
                <Background image={menuData.backgroundImage} />

                <TitleButtons
                    title={menuData.title}
                    onAddTitle={handleAddTitle}
                    onRemoveTitle={handleRemoveTitle}
                    showTitle={menuData.showTitle}
                />

                {menuData.showTitle && (
                    <EditTitle title={menuData.title} onChange={handleTitleChange} />
                )}

                <SizesButtons
                    drinkSizes={menuData.drink_sizes}
                    onAddSize={() => handleAdd('drink_sizes', '200')}
                    onRemoveSize={() => handleRemove('drink_sizes', menuData.drink_sizes.length - 1)}
                />
                <EditSizes drinkSizes={menuData.drink_sizes} onSizeChange={handleSizeChange} />

                <DrinksButtons
                    drinks={menuData.drinks}
                    onAddDrink={() =>
                        handleAdd('drinks', {
                            name: 'Новый напиток',
                            price: 200,
                            description: '',
                            backgroundColor: '#ffffffcf',
                        })
                    }
                    onRemoveDrink={() => handleRemove('drinks', menuData.drinks.length - 1)}
                />
                <EditDrinks drinks={menuData.drinks} onDrinkChange={handleDrinkChange} />
            </div>
            <Options menuData={menuData} setMenuData={setMenuData}/>
        </>
    );
};

export default MenuEditor;
