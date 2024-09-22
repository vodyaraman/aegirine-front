import React, { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import queryBuilder from '../../utils/queryBuilder';

export const GetQRCode = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [qrValue, setQrValue] = useState('');  // Изначально пустое значение для QR-кода
    const containerRef = useRef(null);
    const qrRef = useRef(null);

    const fetchClientLink = async () => {
        try {
            const response = await queryBuilder.getClientLink();  // Запрос на получение ссылки от сервера
            setQrValue(response.clientUrl);  // Устанавливаем полученную ссылку как значение для QR-кода
        } catch (error) {
            console.error('Ошибка при получении ссылки:', error);
        }
    };
    // Получаем ссылку от сервера при первом отображении QR-кода
    useEffect(() => {
        fetchClientLink();
    }, []);

    const handleGetQRCodeClick = () => {
        setIsVisible(!isVisible);
    };

    const handleClickOutside = (event) => {
        if (event.target.closest('.qrcode')) {
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

    const handleDownloadClick = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <>
            <div className="tool qrcode" onClick={handleGetQRCodeClick}>
                <img src="/get-qr.png" draggable="false" />
            </div>
            {isVisible && (
                <div ref={containerRef} className={`qrcode-upload-container ${isVisible ? '' : 'closed'}`}>
                    <div className="qrcode-preview" ref={qrRef}>
                        {qrValue ? <QRCodeSVG value={qrValue} /> : <div className='cool-spinner white'></div>}  {/* Отображаем QR-код только при наличии ссылки */}
                    </div>
                    <button className="qrcode-upload-button" onClick={handleDownloadClick}>
                        Скачать QR-код
                    </button>
                </div>
            )}
        </>
    );
};
