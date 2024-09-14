import React from 'react';

export const OpenLink = ({ link = "http://localhost:4321/client" }) => {

    const handleOpen = () => {
        window.open(link, '_blank');
    };

    return (
        <div className="tool link" onClick={handleOpen}>
            <img src="/open-link.png" draggable="false" alt="Open Link" />
        </div>
    );
};

