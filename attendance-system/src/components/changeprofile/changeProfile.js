import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const ChangeProfilePhoto = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(file);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        if (!image) {
            message.error('No image selected');
            return;
        }
        // Implement the upload logic here, e.g., using axios to send the image to the server
        message.success('Image selected successfully');
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            textAlign: 'center',
        }}>
            {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginBottom: '10px',
                }} />
            ) : (
                <div style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginBottom: '10px', backgroundColor: '#f0f0f0'
                }}>
                    No Image Selected
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="file-input"
            />
            <label htmlFor="file-input">
                <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    style={{ marginTop: '10px', }}
                    onClick={() => document.getElementById('file-input').click()}
                >
                    Choose Image
                </Button>
            </label>
            {image && (
                <Button type="primary" onClick={handleUpload} >
                    Upload Image
                </Button>
            )}
        </div>
    );
};

export default ChangeProfilePhoto;
