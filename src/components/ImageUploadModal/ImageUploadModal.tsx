import React, {
    useRef, useState, ChangeEvent, DragEvent,
} from 'react';
import Button from '@mui/material/Button';

import Modal from 'src/components/Modal/Modal';
import UploadImage from 'src/assets/svg/undraw_add_files_re_v09g.svg';

import './image-upload.scss';

type Props = {
    isOpen: boolean;
    onImageConfirm: (file: File) => void;
    toggleModal: (isOpen: boolean) => void;
};
const ImageUploadModal: React.FC<Props> = ({
    isOpen,
    toggleModal,
    onImageConfirm,
}) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type.includes('image')) {
            setSelectedImage(selectedFile);
        }
    };

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.includes('image')) {
            setSelectedImage(file);
        }
    };

    const openFileInput = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const clearSelectedImage = () => {
        setSelectedImage(null);
    };

    const confirmImage = () => {
        if (selectedImage) {
            onImageConfirm(selectedImage);
        }
    };

    return (
        <Modal
            title="Upload Image"
            isOpen={isOpen}
            toggleModal={(modalIsOpen) => toggleModal(modalIsOpen)}
        >
            <div className="image-upload">
                <input
                    ref={hiddenFileInput}
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <div
                    className="image-upload--preview"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={openFileInput}
                >
                    {selectedImage ? (
                        <>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="preview"
                            />
                            <p>{selectedImage.name}</p>
                        </>
                    ) : (
                        <>
                            <img
                                src={UploadImage}
                                alt="upload"
                            />
                            <p>Drag and drop an image here, or click to select an image</p>
                        </>
                    )}
                </div>
                <div className="image-upload--actions">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => toggleModal(false)}
                    >
                        Cancel
                    </Button>
                    {selectedImage ? (
                        <div className="image-upload--actions_end">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={clearSelectedImage}
                            >
                                Clear
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={confirmImage}
                            >
                                Confirm
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={openFileInput}
                        >
                            Upload
                        </Button>
                    )}
                </div>
            </div>
        </Modal>

    );
};

export default ImageUploadModal;
