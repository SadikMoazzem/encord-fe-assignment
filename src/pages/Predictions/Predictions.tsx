import React, { useEffect, useState } from 'react';

import TabPanel from 'src/components/TabPanel/TabPanel';
import PredictionsTable from 'src/components/PredictionsTable/PredictionsTable';
import ImageViewer from 'src/components/ImageViewer/ImageViewer';
import Modal from 'src/components/Modal/Modal';
import { ImagePrediction } from 'src/types/base-types';
import { useGetPrediction, useGetPredictions } from 'src/hooks/axios';

import './predictions-panel.scss';

type Props = {
    tabIndex: number,
    currentTabIndex: number,
}
const Predictions: React.FC<Props> = ({
    tabIndex,
    currentTabIndex,
}) => {
    const [predictionToView, setPredictionToView] = useState<ImagePrediction>();
    const isActive = tabIndex === currentTabIndex;

    const [{
        response: predictions,
        loading: loadingPredictions,
        error: predictionsError,
    }, getPredictions] = useGetPredictions();

    useEffect(() => {
        getPredictions();
    }, [isActive]);

    const [{
        response: predictionOutputs,
        // loading: loadingPrediction,
        // error: predictionError,
    }, getPrediction] = useGetPrediction();

    useEffect(() => {
        if (predictionToView) {
            // Would normally use the prediction id here
            getPrediction();
        }
    }, [predictionToView]);

    const dataStatus = loadingPredictions ? 'loading' : predictionsError ? 'error' : 'ready';

    return (
        <TabPanel
            index={tabIndex}
            value={currentTabIndex}
            label="Predictions"
            className="predictions-panel"
        >
            <div className="predictions-panel--view">
                <PredictionsTable
                    predictions={predictions?.data || []}
                    dataStatus={dataStatus}
                    getData={getPredictions}
                    setPredictionToView={(prediction: ImagePrediction) => setPredictionToView(prediction)}
                />
                <Modal
                    toggleModal={() => setPredictionToView(undefined)}
                    title={predictionToView?.title || 'Prediction'}
                    isOpen={!!predictionToView} // TODO: fix this,
                    rootClass="image-modal"
                >
                    <ImageViewer
                        prediction={predictionToView}
                        predictionOutputs={predictionOutputs?.data.predictions || []}
                    />
                </Modal>
            </div>
        </TabPanel>
    );
};

export default Predictions;
