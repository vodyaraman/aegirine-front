import React, { useState, useEffect, useRef } from 'react';
import queryBuilder from '../../utils/queryBuilder';
import { eventBus } from '../../utils/eventBus';

export const GetBackground = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [previewSource, setPreviewSource] = useState('');
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
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
            setFileName(file.name);
            setSelectedFile(file);
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
            return;
        }

        setUploading(true);

        try {
            const imageId = `background_${Date.now()}`;
            const response = await queryBuilder.uploadImage(selectedFile, imageId, 'Background image');

            const savedMenuData = localStorage.getItem('menuData');
            const menuData = savedMenuData ? JSON.parse(savedMenuData) : {};

            const updatedMenuData = {
                ...menuData,
                images: {
                    ...menuData.images,
                    backgroundImage: {
                        imageId: response.imageId,
                        imageUrl: response.url
                    }
                }
            };

            localStorage.setItem('menuData', JSON.stringify(updatedMenuData));

            eventBus.dispatchEvent(new CustomEvent('imageUploaded', { detail: { imageId: response.imageId, imageUrl: response.url } }));

            setIsUploaded(true);
            setPreviewSource('');
            setFileName('');
            setSelectedFile(null);

            setTimeout(() => {
                setIsVisible(false);
                setIsUploaded(false);
            }, 4000);
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
        } finally {
            setUploading(false);
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

                    {selectedFile && !isUploaded && (
                        <button
                            className="photo-upload-button"
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            {uploading ? <div className="cool-spinner"></div> : 'Загрузить'}
                        </button>
                    )}

                    {isUploaded && (
                        <button className="photo-upload-button uploaded">
                            ✔
                            <div className="progress"></div>
                        </button>
                    )}
                </div>
            )}
        </>
    );
};
