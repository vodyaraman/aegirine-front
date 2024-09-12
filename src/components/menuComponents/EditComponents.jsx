import React from 'react';

export const EditTitle = ({ title, onChange }) => (
    <div
        className="menu-title"
        style={{
            fontFamily: title.font,
            fontSize: title.fontSize,
            color: title.color,
        }}
    >
        <input
            type="text"
            value={title.text}
            onChange={(e) => onChange(e.target.value)}
            style={{
                fontFamily: title.font,
                fontSize: title.fontSize,
                color: title.color,
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
            }}
        />
    </div>
);

export const EditSizes = ({ drinkSizes, onSizeChange }) => (
    <div className="menu-sizes">
        {drinkSizes.map((size, index) => (
            <div key={index} className="menu-size">
                <input
                    type="text"
                    value={size}
                    onChange={(e) => onSizeChange(index, e.target.value)}
                    style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                    }}
                />
            </div>
        ))}
    </div>
);

export const EditDrinks = ({ drinks, onDrinkChange }) => (
    <div className="menu-drinks">
        {drinks.map((drink, index) => (
            <div
                className="menu-drink-item"
                key={index}
                style={{ backgroundColor: drink.backgroundColor }}
            >
                <h3 className="drink-name">
                    <input
                        type="text"
                        value={drink.name}
                        onChange={(e) => onDrinkChange(index, 'name', e.target.value)}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                        }}
                    />
                </h3>
                <p className="drink-price">
                    <input
                        type="number"
                        value={drink.price}
                        onChange={(e) => onDrinkChange(index, 'price', e.target.value)}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                        }}
                    />
                </p>
            </div>
        ))}
    </div>
);

export const EditImages = ({ imageId, mascotId, onImageChange }) => (
    <>
        <div className="menu-logo">
            <input
                type="text"
                className="menu-image-input"
                value={imageId}
                onChange={(e) => onImageChange('imageId', e.target.value)}
                style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                }}
            />
            <img src={`https://example.com/${imageId}`} alt="Logo" />
        </div>
        <div className="menu-mascot">
            <input
                type="text"
                className="menu-image-input"
                value={mascotId}
                onChange={(e) => onImageChange('mascotId', e.target.value)}
                style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                }}
            />
            <img src={`https://example.com/${mascotId}`} alt="Mascot" />
        </div>
    </>
);
