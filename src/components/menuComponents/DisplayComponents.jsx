import React from 'react';

export const MenuTitle = ({ title }) => (
    <div
        className="menu-title"
        style={{
            fontFamily: title.font,
            fontSize: title.fontSize,
            color: title.color,
        }}
    >
        {title.text}
    </div>
);

export const MenuSizes = ({ drinkSizes }) => (
    <div className="menu-sizes">
        {drinkSizes.map((size, index) => (
            <span className="menu-size" key={index}>
                {size}
            </span>
        ))}
    </div>
);

export const MenuDrinks = ({ drinks }) => (
    <div className="menu-drinks">
        {drinks.map((drink, index) => (
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
);

export const MenuImages = ({ imageId, mascotId }) => (
    <>
        <div className="menu-logo">
            <img src={`https://example.com/${imageId}`} alt="Logo" />
        </div>
        <div className="menu-mascot">
            <img src={`https://example.com/${mascotId}`} alt="Mascot" />
        </div>
    </>
);
