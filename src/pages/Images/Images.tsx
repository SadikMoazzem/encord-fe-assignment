import React from 'react';
import { Button } from '@mui/material';

import TabPanel from 'src/components/TabPanel/TabPanel';
import ImageUploadModal from 'src/components/ImageUploadModal/ImageUploadModal';
import CreatePredictionModal from 'src/components/CreatePredictionModal/CreatePredictionModal';
import ImagesTable from 'src/components/ImagesTable/ImagesTable';
import { ImageObj, ImageRes } from 'src/types/base-types';

import './images-panel.scss';

type Props = {
    tabIndex: number,
    currentTabIndex: number,
    availableImages: ImageRes,
    setSelectedImage: (file: File) => void,
    navigateToPredictions: () => void, // Wouldnt normally be here, but for the sake of the example
}
const Images: React.FC<Props> = ({
    tabIndex,
    currentTabIndex,
    availableImages,
    setSelectedImage,
    navigateToPredictions,
}) => {
    const [userIsUploadingImage, setIsUploadingImage] = React.useState(false);
    const [userIsPredictingImage, setIsPredictingImage] = React.useState(false);

    const [selectedImageToPredict, setSelectedImageToPredict] = React.useState<ImageObj>();

    const onImageConfirm = (file: File) => {
        setIsUploadingImage(false);
        setSelectedImage(file);
    };

    const onImagePredict = (selectedImage: ImageObj) => {
        setSelectedImageToPredict(selectedImage);
        setIsPredictingImage(true);
    };

    return (
        <TabPanel
            index={tabIndex}
            value={currentTabIndex}
            label="Images"
            className="images-panel"
        >
            <div className="images-panel--actions">
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => setIsUploadingImage(true)}
                >
                    Upload Image
                </Button>
            </div>
            <div className="images-panel--view">
                <ImagesTable
                    availableImages={availableImages}
                    onImagePredict={onImagePredict}
                    openImageUploadModal={() => setIsUploadingImage(true)}
                />
            </div>
            <ImageUploadModal
                isOpen={userIsUploadingImage}
                toggleModal={(isOpen) => setIsUploadingImage(isOpen)}
                onImageConfirm={onImageConfirm}
            />
            <CreatePredictionModal
                isOpen={userIsPredictingImage}
                toggleModal={(isOpen) => setIsPredictingImage(isOpen)}
                selectedImage={selectedImageToPredict}
                navigateToPredictions={navigateToPredictions}
            />
        </TabPanel>
    );
};

export default Images;
