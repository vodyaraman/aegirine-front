import React, { useState, useEffect, useRef } from 'react';
import queryBuilder from '../../utils/queryBuilder';

export const GetBackground = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [previewSource, setPreviewSource] = useState('');
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);  // Добавляем состояние для выбранного файла
    const [uploading, setUploading] = useState(false); // Добавляем состояние для отслеживания загрузки
    const containerRef = useRef(null);

    const handleGetPhotoClick = () => {
        setIsVisible(!isVisible);
    };

    const handleClickOutside = (event) => {
        if (event.target.closest('.background')) {
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

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Устанавливаем имя файла в состояние
            setSelectedFile(file);  // Устанавливаем выбранный файл в состояние
            previewFile(file);
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            return alert('Сначала выберите файл!');
        }

        setUploading(true);

        try {
            // Отправляем изображение через QueryBuilder
            const imageId = `background_${Date.now()}`;  // Пример генерации imageId
            await queryBuilder.uploadImage(selectedFile, imageId, 'Background image');
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            alert('Ошибка при загрузке изображения');
        } finally {
            setUploading(false);
            setIsVisible(false);  // Закрываем окно после загрузки
        }
    };

    return (
        <>
            <div className="tool background" onClick={handleGetPhotoClick}>
                <img src="/change-background.png" draggable="false" />
            </div>
            {isVisible && (
                <div ref={containerRef} className={`photo-upload-container ${isVisible ? '' : 'closed'}`}>
                    <div className="photo-upload-input-container">
                        <label className="custom-file-label">Выберите файл</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="photo-upload-input"
                            onChange={handleFileInputChange}
                        />
                    </div>
                    {previewSource && (
                        <div className="photo-preview">
                            <img src={previewSource} alt="Preview" className="photo-preview-image" />
                        </div>
                    )}
                    <span className="file-name">{fileName || 'Файл не выбран'}</span>
                    <button
                        className="photo-upload-button"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading ? 'Загрузка...' : 'Загрузить'}
                    </button>
                </div>
            )}
        </>
    );
};
