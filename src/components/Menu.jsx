import React, { useState, useEffect } from 'react';
import { Background } from './Background';

const ClientMenu = () => {
    const defaultMenuData = {
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
                description: 'Острый, как чапалах!',
                font: 'Roboto',
                size: '1.5rem',
                color: '#333333',
                backgroundColor: '#ffffffcf',
            },
        ],
        imageId: 'logo123',
        mascotId: 'mascot123',
        backgroundImage: 'https://img.goodfon.ru/original/2560x1600/0/a4/lodka-priroda-peyzazh-ozero.jpg',
    };

    // Функция для загрузки данных из localStorage с проверкой, что это выполняется на клиенте
    const loadMenuData = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                const savedData = localStorage.getItem('menuData');
                return savedData ? JSON.parse(savedData) : defaultMenuData;
            } catch (error) {
                console.error('Ошибка при загрузке данных из localStorage:', error);
                return defaultMenuData;
            }
        }
        return defaultMenuData;  // Если это серверная часть, вернуть данные по умолчанию
    };

    const [menuData, setMenuData] = useState(defaultMenuData);

    useEffect(() => {
        const data = loadMenuData();
        setMenuData(data);
    }, []);

    // Сохранение данных в localStorage при их изменении
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                localStorage.setItem('menuData', JSON.stringify(menuData));
            } catch (error) {
                console.error('Ошибка при сохранении данных в localStorage:', error);
            }
        }
    }, [menuData]);

    return (
        <>
            <Background image={menuData.backgroundImage} />
            <div className="client-menu-frame">
                <div className="client-menu-logo">
                    <img src={`https://example.com/logos/${menuData.imageId}.png`} alt="Logo" />
                </div>
                <div className="client-menu-mascot">
                    <img src={`https://example.com/mascots/${menuData.mascotId}.png`} alt="Mascot" />
                </div>

                {menuData.showTitle && (
                    <div
                        className="client-menu-title"
                        style={{ color: menuData.title.color, fontFamily: menuData.title.font, fontSize: menuData.title.size }}
                    >
                        {menuData.title.content}
                    </div>
                )}

                <div className="client-menu-sizes">
                    {menuData.drink_sizes.map((size, index) => (
                        <div key={index} className="client-menu-size">
                            {size}
                        </div>
                    ))}
                </div>

                <div className="client-menu-drinks">
                    {menuData.drinks.map((drink, index) => (
                        <div
                            key={index}
                            className="client-menu-drink-item"
                            style={{ backgroundColor: drink.backgroundColor }}
                        >
                            <div
                                className="client-drink-name"
                                style={{ fontFamily: drink.font, fontSize: drink.size, color: drink.color }}
                            >
                                {drink.content}
                            </div>
                            <div className="client-drink-price">
                                {drink.price}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default ClientMenu;

