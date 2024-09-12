import React from 'react';

const ActionButtons = ({ condition, onAdd, onRemove, addLabel, removeLabel, className }) => (
    <div className={className}>
        {condition ? (
            <>
                <button className="add-button" onClick={onAdd}>{addLabel}</button>
                <button className="remove-button" onClick={onRemove}>{removeLabel}</button>
            </>
        ) : (
            <button className="add-button" onClick={onAdd}>{addLabel}</button>
        )}
    </div>
);

export const TitleButtons = ({ title, onAddTitle, onRemoveTitle }) => (
    <ActionButtons
        condition={title.text}
        onAdd={onAddTitle}
        onRemove={onRemoveTitle}
        addLabel="Изменить тайтл"
        removeLabel="Очистить тайтл"
        className="title-buttons"
    />
);

export const SizesButtons = ({ drinkSizes, onAddSize, onRemoveSize }) => (
    <ActionButtons
        condition={drinkSizes.length > 0}
        onAdd={onAddSize}
        onRemove={onRemoveSize}
        addLabel="Добавить размер напитка"
        removeLabel="Убрать последний размер"
        className="sizes-buttons"
    />
);

export const DrinksButtons = ({ drinks, onAddDrink, onRemoveDrink }) => (
    <ActionButtons
        condition={drinks.length > 0}
        onAdd={onAddDrink}
        onRemove={onRemoveDrink}
        addLabel="Добавить напиток"
        removeLabel="Убрать последний напиток"
        className="drinks-buttons"
    />
);
