import React, { useState, useEffect } from 'react';
import { Background } from './Background';
import queryBuilder from '../utils/queryBuilder';

const ClientMenu = () => {
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadMenuFromServer = async () => {
            try {
                const data = await queryBuilder.getMenu();
                if (data) {
                    setMenuData(data);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error('Ошибка при загрузке меню с сервера:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadMenuFromServer();
    }, []);

    if (loading) {
        return <div>Загрузка меню...</div>; // Пока данные загружаются
    }

    if (error || !menuData) {
        return <div>Это меню ещё не заполнено</div>; // Ошибка или отсутствие данных
    }

    return (
        <>
            <Background imageId={menuData.images.backgroundImage.imageId} />
            <div className="client-menu-frame">

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
