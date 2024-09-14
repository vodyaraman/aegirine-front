import React, { useState, useEffect, useRef } from 'react';

export const GetLink = ({ link = "example.com" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        alert('Ссылка скопирована!');
    };

    const handleGetLinkClick = () => {
        setIsVisible(!isVisible);
    };

    const handleClickOutside = (event) => {
        if (event.target.closest('.link')) {
            return;
        }

        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    return (
        <>
            <div className="tool link" onClick={handleGetLinkClick}>
                <img src="/get-link.png" draggable="false" />
            </div>
            {isVisible && (
                <div ref={containerRef} className={`get-link-container ${isVisible ? '' : 'closed'}`}>
                    <input
                        type="text"
                        value={link}
                        readOnly
                        className="get-link-input"
                    />
                    <button onClick={handleCopy} className="get-link-button">
                        Копировать
                    </button>
                </div>
            )}
        </>
    );
};
