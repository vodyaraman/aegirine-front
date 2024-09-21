import React, { useState, useEffect, useRef } from 'react';
import queryBuilder from '../../utils/queryBuilder'; 

export const GetLink = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [link, setLink] = useState('');
    const containerRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
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

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const response = await queryBuilder.getConnectionLink(); // Вызов метода из queryBuilder
                setLink(response.link); // Установка полученной ссылки в состояние
            } catch (error) {
                console.error('Ошибка при получении ссылки:', error);
            }
        };

        fetchLink();
    }, []);

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

