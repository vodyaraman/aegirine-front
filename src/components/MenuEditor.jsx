import React, { useState } from 'react';
import { Background } from './Background';
import { EditDrinks, EditTitle, EditSizes } from './menuComponents/EditComponents';
import { TitleButtons, SizesButtons, DrinksButtons } from './menuComponents/MenuEditorButtons';
import Options from './Options';

const MenuEditor = () => {
    const [menuData, setMenuData] = useState({
        title: {
            content: 'Новый тайтл',
            font: 'Rubik',
            size: '2.5rem',
            color: '#faeee6',
        },
        showTitle: true,
        drink_sizes: ['S', 'M', 'L'],
        drinks: [
            {
                content: 'Имбирный чапалах',
                price: 270,
                description: '',
                font: 'Roboto',
                size: '1.5rem',
                color: '#333333',
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

    const handleTitleChange = (newContent) => {
        updateField('title', { ...menuData.title, content: newContent }); // Исправлено text на content
    };

    const handleAddTitle = () => {
        updateField('title', { ...menuData.title, content: 'Новый тайтл' }); // Исправлено text на content
        updateField('showTitle', true); // Показываем заголовок
    };

    const handleRemoveTitle = () => {
        updateField('title', {
            content: '',
            font: 'Rubik',
            size: '35px',
            color: '#faeee6',
            backgroundColor: '',
        });
        updateField('showTitle', false);
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
                            content: 'Новый напиток',  // Исправлено на content
                            price: 200,
                            description: '',
                            font: 'Arial',  // Добавлено поле font для соответствия структуре
                            size: '16px',  // Добавлено поле size
                            color: '#333333',  // Добавлено поле color
                            backgroundColor: '#ffffffcf',
                        })
                    }
                    onRemoveDrink={() => handleRemove('drinks', menuData.drinks.length - 1)}
                />
                <EditDrinks drinks={menuData.drinks} onDrinkChange={handleDrinkChange} />
            </div>
            <Options menuData={menuData} setMenuData={setMenuData} />
        </>
    );
};

export default MenuEditor;
