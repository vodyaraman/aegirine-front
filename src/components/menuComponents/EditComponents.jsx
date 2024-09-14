import React, { useRef, useEffect } from 'react';

export const EditTitle = ({ title, onChange }) => (
    <div
        className="menu-title-input"
        style={{
            fontFamily: title.font,
            fontSize: title.size, // Используем корректное поле 'size'
            color: title.color,
            backgroundColor: title.backgroundColor || 'transparent',  // Если нужен фон
        }}
    >
        <input
            type="text"
            value={title.content || ""}
            onChange={(e) => onChange(e.target.value)}
            className="title-input-field"
            style={{
                fontFamily: title.font,
                fontSize: title.size, // Используем корректное поле 'size'
                color: title.color,
                backgroundColor: title.backgroundColor || 'transparent', // Добавляем фон, если есть
            }}
        />
    </div>
);

export const EditSizes = ({ drinkSizes, onSizeChange }) => {
    const inputRefs = useRef([]);

    const updateInputWidth = (index) => {
        const input = inputRefs.current[index];
        if (input) {
            input.style.width = `${Math.max(input.value.length * 15, 50)}px`;
        }
    };

    useEffect(() => {
        drinkSizes.forEach((_, index) => updateInputWidth(index));
    }, [drinkSizes]);

    return (
        <div className="menu-sizes-input">
            {drinkSizes.map((size, index) => (
                <div key={index} className="menu-size-input">
                    <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        value={size}
                        onChange={(e) => {
                            onSizeChange(index, e.target.value);
                            updateInputWidth(index);
                        }}
                        className="size-input-field"
                    />
                </div>
            ))}
        </div>
    );
};

export const EditDrinks = ({ drinks, onDrinkChange }) => (
    <div className="menu-drinks-input">
        {drinks.map((drink, index) => (
            <div
                className="menu-drink-item-input"
                key={index}
                style={{
                    backgroundColor: drink.backgroundColor || 'transparent', // Проверка на существование
                    color: drink.color || 'inherit', // Проверка на существование
                    fontFamily: drink.font || 'inherit', // Шрифт
                    fontSize: drink.size || 'inherit', // Размер шрифта
                }}
            >
                <div className="top-row">
                    <h3 className="drink-name-input">
                        <input
                            type="text"
                            value={drink.content || ""}
                            key={index}
                            onChange={(e) => onDrinkChange(index, 'content', e.target.value)}  // Исправлено на 'content'
                            className="drink-name-input-field"
                            style={{
                                color: drink.color || 'inherit', // Передача стиля цвета
                                fontFamily: drink.font || 'inherit', // Передача шрифта
                                fontSize: drink.size || 'inherit', // Передача размера шрифта
                            }}
                        />
                    </h3>
                    <p className="drink-price-input">
                        <input
                            type="text"
                            value={drink.price}
                            key={index}
                            onChange={(e) => onDrinkChange(index, 'price', parseFloat(e.target.value))}
                            className="drink-price-input-field"
                        />
                    </p>
                </div>

                {drink.description && (
                    <p className="drink-description">
                        <input
                            type="text"
                            value={drink.description}
                            onChange={(e) => onDrinkChange(index, 'description', e.target.value)}
                            className="drink-description-input"
                        />
                    </p>
                )}
            </div>
        ))}
    </div>
);

export const EditImages = ({ imageId, mascotId, onImageChange }) => (
    <>
        <div className="menu-logo-input">
            <input
                type="text"
                value={imageId}
                onChange={(e) => onImageChange('imageId', e.target.value)}
                className="logo-input-field"
            />
            <img src={`https://example.com/${imageId}`} alt="Logo" className="logo-image" />
        </div>
        <div className="menu-mascot-input">
            <input
                type="text"
                value={mascotId}
                onChange={(e) => onImageChange('mascotId', e.target.value)}
                className="mascot-input-field"
            />
            <img src={`https://example.com/${mascotId}`} alt="Mascot" className="mascot-image" />
        </div>
    </>
);
