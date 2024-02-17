import React, {
    useEffect, useMemo, useRef, useState,
} from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useDebounceCallback, useResizeObserver } from 'usehooks-ts';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import { ImagePrediction, Prediction } from 'src/types/base-types';
import PredictionBox from './sub-components/PredictionBox';

import './image-viewer.scss';

type Size = {
    width: number
    height: number
  }

type Props = {
    prediction?: ImagePrediction,
    predictionOutputs?: Prediction[],
}
const ImageViewer: React.FC<Props> = ({
    prediction, predictionOutputs,
}) => {
    const [errorLoadingImage, setErrorLoadingImage] = useState(false);

    const imageRef = useRef<HTMLImageElement>(null);
    const [updatedSize, setSize] = useState<Size>();
    const [defaultSize, setDefaultSize] = useState<Size>();
    const [loadSize, setLoadSize] = useState<Size>();

    // Can remove the debounce for smoother resizing
    const onResize = useDebounceCallback(setSize, 50);

    useResizeObserver({
        ref: imageRef,
        onResize: ({ width, height }) => {
            if (width && height) {
                onResize({ width, height });
            }
        },
    });

    useEffect(() => () => {
        setDefaultSize(undefined);
        setLoadSize(undefined);
        setSize(undefined);
    }, [prediction]);

    const currentSize = useMemo(() => {
        if (!updatedSize) return loadSize;
        return updatedSize;
    }, [updatedSize, loadSize]);

    // Add logic for when issues with sizing/no predictions
    if (errorLoadingImage) {
        return <Alert severity="error">Error loading prediction</Alert>;
    }

    return (
        <TransformWrapper
            minScale={0.75}
            initialScale={0.95}
        >
            {({
                zoomIn, zoomOut, resetTransform,
            }) => (
                <div className="image-viewer">
                    <TransformComponent>
                        <img
                            src={prediction?.image_filename || ''}
                            alt="prediction"
                            style={{ width: '100%', height: 'auto' }}
                            ref={imageRef}
                            onLoad={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                const target = e.target as HTMLImageElement;
                                setDefaultSize({
                                    width: target.naturalWidth,
                                    height: target.naturalHeight,
                                });
                                setLoadSize({
                                    width: target.width,
                                    height: target.height,
                                });
                                setErrorLoadingImage(false);
                            }}
                            onError={() => {
                                setErrorLoadingImage(true);
                            }}
                        />

                        {defaultSize && currentSize && predictionOutputs?.map((predictionBox) => (
                            <PredictionBox
                                key={predictionBox.label}
                                predictionBox={predictionBox}
                                defaultSize={defaultSize}
                                currentSize={currentSize}
                            />
                        ))}
                    </TransformComponent>
                    <div className="image-viewer--tools">
                        <div className="image-viewer--tools_image-control">
                            <Button aria-description="Zoom In" variant="text" onClick={() => zoomIn()}><ZoomInIcon /></Button>
                            <Button aria-description="Zoom Out" variant="text" onClick={() => zoomOut()}><ZoomOutIcon /></Button>
                            <Button aria-description="Reset" variant="text" onClick={() => resetTransform()}>Reset</Button>
                        </div>
                    </div>
                </div>
            )}
        </TransformWrapper>
    );
};

export default ImageViewer;
