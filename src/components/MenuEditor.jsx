import React, { useState, useEffect } from 'react';
import { Background } from './Background';
import { EditDrinks, EditTitle, EditSizes } from './menuComponents/EditComponents';
import { TitleButtons, SizesButtons, DrinksButtons } from './menuComponents/MenuEditorButtons';
import Options from './Options';
import Save from './Save';
import queryBuilder from '../utils/queryBuilder';
import { eventBus } from '../utils/eventBus';

const MenuEditor = () => {
    const defaultMenuData = {
        title: {
            content: '',
            font: '',
            size: '',
            color: '',
        },
        showTitle: false,
        drink_sizes: [],
        drinks: [],
        imageId: '',
        mascotId: '',
        backgroundImage: 'https://img.goodfon.ru/original/2560x1600/0/a4/lodka-priroda-peyzazh-ozero.jpg',
    };
    const [menuData, setMenuData] = useState(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const savedData = localStorage.getItem('menuData');
            return savedData ? JSON.parse(savedData) : defaultMenuData;
        }
        return defaultMenuData;
    })
    const [loading, setLoading] = useState(true);   // Состояние загрузки

    // Функция для получения меню
    const fetchMenuData = async () => {
        try {
            const response = await queryBuilder.getMenu();  // Получаем данные с сервера
            if (response) {
                setMenuData(response);  // Устанавливаем данные меню из ответа
                if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.setItem('menuData', JSON.stringify(response));  // Сохраняем меню в localStorage
                }
            } else {
                const savedData = localStorage.getItem('menuData');  // Если ответа нет, берём из localStorage
                if (savedData) {
                    setMenuData(JSON.parse(savedData));
                }
            }
        } catch (error) {
            console.error('Ошибка при получении меню:', error);
            const savedData = localStorage.getItem('menuData');  // В случае ошибки берём из localStorage
            if (savedData) {
                setMenuData(JSON.parse(savedData));
            }
        } finally {
            setLoading(false);  // Останавливаем состояние загрузки
        }
    };

    // useEffect для получения меню при загрузке компонента
    useEffect(() => {
        fetchMenuData();  // Вызываем функцию для получения меню
    }, []);

    // Логика обновления поля в menuData
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
        updateField('title', { ...menuData.title, content: newContent });
    };

    const handleAddTitle = () => {
        updateField('title', { ...menuData.title, content: 'Новый тайтл' });
        updateField('showTitle', true);
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

    const handleSave = () => {
        queryBuilder.saveMenu(menuData)
            .then(() => {
                console.log('Меню успешно сохранено на сервере.');
            })
            .catch((error) => {
                console.error('Ошибка при сохранении меню на сервере:', error);
            });
    };

    const handleImageUpload = (event) => {
        const { imageId, imageUrl } = event.detail; // Получаем imageId и imageUrl из события
    
        setMenuData(prev => ({
            ...prev,
            images: {
                ...prev.images,
                backgroundImage: {  // Обновляем только backgroundImage в правильной структуре
                    imageId: imageId,
                    imageUrl: imageUrl
                }
            }
        }));
    };    

    // Подписка на событие при монтировании компонента
    useEffect(() => {
        eventBus.addEventListener('imageUploaded', handleImageUpload);

        return () => {
            // Удаляем слушатель при размонтировании
            eventBus.removeEventListener('imageUploaded', handleImageUpload);
        };
    }, []);

    // Показываем индикатор загрузки, пока данные меню загружаются
    if (loading) {
        return <div>Загрузка меню...</div>;
    }

    // Если данных меню нет (ни на сервере, ни в localStorage)
    if (!menuData) {
        return <div>Нет данных для отображения.</div>;
    }

    return (
        <>
            <div className="menu-editor">
                <Background imageId={menuData.images.backgroundImage.imageId} />

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
                            content: 'Новый напиток',
                            price: '200',
                            description: '',
                            font: 'Roboto',
                            size: '1.5rem',
                            color: '#333333',
                            backgroundColor: '#ffffffcf',
                        })
                    }
                    onRemoveDrink={() => handleRemove('drinks', menuData.drinks.length - 1)}
                />
                <EditDrinks drinks={menuData.drinks} onDrinkChange={handleDrinkChange} />
            </div>
            <Options menuData={menuData} setMenuData={setMenuData} />
            <Save menuData={menuData} onSave={handleSave} />
        </>
    );
};

export default MenuEditor;
