import React from 'react';

const ActionButtons = ({ condition, maxReached, onAdd, onRemove, addLabel, removeLabel, className }) => (
    <div className={className}>
        {!maxReached && <button className="add-button" onClick={onAdd}>{addLabel}</button>}
        {condition && <button className="remove-button" onClick={onRemove}>{removeLabel}</button>}
    </div>
);

export const TitleButtons = ({ title, showTitle, onAddTitle, onRemoveTitle }) => {
    const handleAddTitle = () => {
        if (!showTitle) {
            onAddTitle();
        }
    };

    const handleRemoveTitle = () => {
        if (showTitle) {
            onRemoveTitle();
        }
    };

    return (
        <div className="title-buttons">
            {!showTitle ? (
                <button className="add-button" onClick={handleAddTitle}>Добавить тайтл</button>
            ) : (
                <button className="remove-button" onClick={handleRemoveTitle}>Удалить тайтл</button>
            )}
        </div>
    );
};

export const SizesButtons = ({ drinkSizes, onAddSize, onRemoveSize }) => {
    const maxSizes = 5;
    return (
        <ActionButtons
            condition={drinkSizes.length > 0}
            maxReached={drinkSizes.length >= maxSizes}
            onAdd={onAddSize}
            onRemove={onRemoveSize}
            addLabel="Добавить размер"
            removeLabel="Удалить размер"
            className="sizes-buttons"
        />
    );
};

export const DrinksButtons = ({ drinks, onAddDrink, onRemoveDrink }) => (
    <ActionButtons
        condition={drinks.length > 0}
        maxReached={false}
        onAdd={onAddDrink}
        onRemove={onRemoveDrink}
        addLabel="Добавить напиток"
        removeLabel="Удалить напиток"
        className="drinks-buttons"
    />
);