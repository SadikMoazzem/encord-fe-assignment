import React, { useEffect } from 'react';
import { Alert, Button, TextField } from '@mui/material';

import Modal from 'src/components/Modal/Modal';
import { ImageObj } from 'src/types/base-types';
import { useCreatePrediction } from 'src/hooks/axios';

import './create-prediction.scss';

type Props = {
    isOpen: boolean,
    selectedImage?: ImageObj,
    navigateToPredictions: () => void,
    toggleModal: (isOpen: boolean) => void,
}
const CreatePredictionModal: React.FC<Props> = ({
    isOpen,
    selectedImage,
    navigateToPredictions,
    toggleModal,
}) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    useEffect(() => () => {
        setTitle('');
        setDescription('');
    }, [isOpen]);

    const [{ response: predictionCreated, loading: predictionCreating, error: predicationCreationFail }, createPrediction] = useCreatePrediction();

    const isReadyToSubmit = title.length > 3 && description.length > 3;
    return (
        <Modal
            title={`Prediction For: ${selectedImage?.filename}`}
            isOpen={isOpen}
            toggleModal={(modalIsOpen) => toggleModal(modalIsOpen)}
            className="create-prediction"
        >
            <div className="create-prediction--form">
                <div className="create-prediction--form--image">
                    <img src={selectedImage?.url} alt={selectedImage?.filename} />
                </div>
                <div className="create-prediction--form--inputs">
                    <TextField
                        value={title}
                        disabled={!!predictionCreated}
                        fullWidth
                        label="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        value={description}
                        disabled={!!predictionCreated}
                        fullWidth
                        label="Description"
                        multiline
                        rows={3}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {predictionCreated && (
                        <Alert severity="success">Prediction has been created</Alert>
                    )}
                    {predictionCreating && (
                        <Alert severity="info">Running your prediction</Alert>
                    )}
                    {predicationCreationFail && title && (
                        <Alert severity="warning">There was an issue in creating your prediction</Alert>
                    )}
                </div>
            </div>
            <div className="create-prediction--actions">
                <Button
                    variant="outlined"
                    onClick={() => toggleModal(false)}
                >
                    {predictionCreated ? 'Go back' : 'Cancel'}
                </Button>
                {!predictionCreated && (
                    <Button
                        variant="contained"
                        disabled={!isReadyToSubmit || predictionCreating}
                        onClick={() => {
                            if (!isReadyToSubmit) return;
                            if (!selectedImage) return;

                            createPrediction({
                                data: {
                                    title,
                                    description,
                                    prediction_start: new Date().toISOString(),
                                    image_filename: selectedImage?.url,
                                },
                            });
                        }}
                    >
                        Create Prediction
                    </Button>
                )}
                {predictionCreated && (
                    <Button
                        variant="contained"
                        onClick={() => navigateToPredictions()}
                    >
                        View My Predictions
                    </Button>
                )}
            </div>
        </Modal>
    );
};

export default CreatePredictionModal;
