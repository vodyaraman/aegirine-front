import React, { useState, useEffect } from 'react';
import queryBuilder from '../utils/queryBuilder'; // Для обновления меню
import { Background } from './Background'; // Импортируем компонент Background

const MenuEditor = () => {
    const [menuData, setMenuData] = useState({
        title: {
            text: 'Осеннее меню',
            font: 'Arial',
            fontSize: '36px',
            color: '#FF6347',
        },
        drink_sizes: ['Маленький', 'Средний', 'Большой'],
        drinks: [
            {
                name: 'Имбирный чай',
                price: 270,
                description: 'Пряный чай с имбирем',
                backgroundColor: '#F5F5DC',
            },
        ],
        imageId: 'logo123',
        mascotId: 'mascot123',
        backgroundImage: 'https://img.geliophoto.com/murmansk/14_mur.jpg',
    });

    // Метод для подгрузки данных меню
    useEffect(() => {
        async function fetchMenu() {
            const savedMenu = await queryBuilder.loadMenuFromLocalStorage();
            if (savedMenu) {
                setMenuData(savedMenu);
            }
        }
        fetchMenu();
    }, []);

    return (
        <>
            <div className="menu-editor">
                <Background image={menuData.backgroundImage} />
                <div
                    className="menu-title"
                    style={{
                        fontFamily: menuData.title.font,
                        fontSize: menuData.title.fontSize,
                        color: menuData.title.color,
                    }}
                >
                    {menuData.title.text}
                </div>

                <div className="menu-logo">
                    <img src={`https://example.com/${menuData.imageId}`} alt="Logo" />
                </div>

                <div className="menu-mascot">
                    <img src={`https://example.com/${menuData.mascotId}`} alt="Mascot" />
                </div>

                <div className="menu-drinks">
                    {menuData.drinks.map((drink, index) => (
                        <div
                            className="menu-drink-item"
                            key={index}
                            style={{ backgroundColor: drink.backgroundColor }}
                        >
                            <h3 className="drink-name">{drink.name}</h3>
                            <p className="drink-description">{drink.description}</p>
                            <p className="drink-price">{drink.price} руб</p>
                        </div>
                    ))}
                </div>

                <div className="menu-sizes">
                    {menuData.drink_sizes.map((size, index) => (
                        <span className="menu-size" key={index}>
                            {size}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MenuEditor;
