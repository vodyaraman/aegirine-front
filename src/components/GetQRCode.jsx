import React, { useState, useRef, useEffect } from 'react';
import {QRCodeSVG} from 'qrcode.react';

export const GetQRCode = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [qrValue, setQrValue] = useState('https://example.com');
    const containerRef = useRef(null);
    const qrRef = useRef(null);

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

    const handleQrValueChange = (event) => {
        setQrValue(event.target.value);
    };

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
                    <input
                        type="text"
                        value={qrValue}
                        onChange={handleQrValueChange}
                        className="qrcode-input"
                        placeholder="Введите текст или URL для генерации QR-кода"
                    />
                    <div className="qrcode-preview" ref={qrRef}>
                        <QRCodeSVG value={qrValue} />
                    </div>
                    <button className="qrcode-upload-button" onClick={handleDownloadClick}>
                        Скачать QR-код
                    </button>
                </div>
            )}
        </>
    );
};
