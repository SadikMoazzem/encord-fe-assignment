import React, { useMemo } from 'react';

import { Prediction } from 'src/types/base-types';

type Props = {
    predictionBox: Prediction,
    defaultSize: { width: number, height: number },
    currentSize: { width: number, height: number },
}
const PredictionBox: React.FC<Props> = ({
    predictionBox, defaultSize, currentSize,
}) => {
    const x = Math.min(predictionBox.bbox.x1, predictionBox.bbox.x2);
    const y = Math.min(predictionBox.bbox.y1, predictionBox.bbox.y2);
    const boxWidth = Math.abs(predictionBox.bbox.x1 - predictionBox.bbox.x2);
    const boxHeight = Math.abs(predictionBox.bbox.y1 - predictionBox.bbox.y2);
    const bbox = useMemo(() => {
        const geom = {
            x,
            y,
            width: boxWidth,
            height: boxHeight,
        };

        if (!defaultSize || !currentSize) return geom;

        geom.x = (x / defaultSize.width) * currentSize.width;
        geom.y = (y / defaultSize.height) * currentSize.height;
        geom.width = (boxWidth / defaultSize.width) * currentSize.width;
        geom.height = (boxHeight / defaultSize.height) * currentSize.height;

        return geom;
    }, [defaultSize, currentSize]);

    const scoreLabel = useMemo(() => {
        const confidence = Number(predictionBox.score) * 100;
        if (!confidence) return '';
        return `${predictionBox.label} (${confidence.toFixed(0)}%)`;
    }, [predictionBox]);

    return (
        <div
            className="prediction-box"
            data-testid="prediction-box"
            style={{
                position: 'absolute',
                left: bbox.x,
                top: bbox.y,
                width: bbox.width,
                height: bbox.height,
            }}
        >
            <div className="prediction-box--label">
                {scoreLabel}
            </div>
        </div>
    );
};

export default PredictionBox;
