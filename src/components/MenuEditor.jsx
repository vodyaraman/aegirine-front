import React, { useState, useEffect } from 'react';
import queryBuilder from '../utils/queryBuilder';
import { Background } from './Background';

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
                backgroundColor: '#F5F5DC',
            },
        ],
        imageId: 'logo123',
        mascotId: 'mascot123',
        backgroundImage: 'https://fsfera.ru/images/pages/articles/kraski_oseni_v_vashem_obektive3.jpg',
    });

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
                    <img src={`https://example.com/${menuData.imageId}`} alt="" />
                </div>

                <div className="menu-mascot">
                    <img src={`https://example.com/${menuData.mascotId}`} alt="" />
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
                            <p className="drink-price">{drink.price}</p>
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
