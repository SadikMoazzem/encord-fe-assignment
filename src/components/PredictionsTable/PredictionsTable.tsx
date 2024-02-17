import React, { useMemo } from 'react';
import {
    Alert, Button, TableCell, TableRow,
} from '@mui/material';

import Table from 'src/components/Table/Table';
import DataCell from 'src/components/Table/sub-components/DataCell';
import { ImagePrediction } from 'src/types/base-types';
import { predictionsTableColumns } from 'src/components/Table/constants';

import NoPredictionsSVG from 'src/assets/svg/undraw_void_-3-ggu.svg';

type Props = {
    predictions: ImagePrediction[],
    dataStatus: 'loading' | 'error' | 'ready',
    getData: () => void,
    setPredictionToView: (prediction: ImagePrediction) => void,
}
const PredictionsTable: React.FC<Props> = ({
    predictions, dataStatus, getData, setPredictionToView,
}) => {
    const rows: JSX.Element[] = useMemo(() => {
        if (!predictions) return [];
        return predictions.map((prediction) => (
            <TableRow
                key={prediction.id}
            >
                <DataCell
                    data={prediction.title}
                    isMain
                />
                <DataCell
                    data={prediction.description}
                />
                <DataCell
                    data={prediction.prediction_start}
                    type="date"
                />
                <TableCell>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setPredictionToView(prediction)}
                    >
                        View
                    </Button>
                </TableCell>
            </TableRow>
        ));
    }, [predictions]);

    // Add Logic here for pagination/sorting/filtering controlled from action bar

    //
    return (
        <>
            <Table
                headerColumns={predictionsTableColumns}
                rows={rows}
            />
            {dataStatus !== 'ready' && rows.length > 0 && (
                <div className="predictions-panel--view--status">
                    <Alert severity={dataStatus === 'loading' ? 'info' : 'error'}>
                        {dataStatus === 'loading' ? 'Loading Predictions...' : 'Error Loading Predictions'}
                    </Alert>
                    {dataStatus === 'error' && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => getData()}
                        >
                            Retry
                        </Button>
                    )}
                </div>
            )}
            {rows.length === 0 && (
                <div className="predictions-panel--view--status">
                    <img
                        src={NoPredictionsSVG}
                        alt="No predictions available"
                    />
                    <h3>
                        No predictions available
                    </h3>
                    {/*  Run a prediction to get started */}
                </div>
            )}
        </>
    );
};

export default PredictionsTable;
