import React, { useMemo } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';

import Table from 'src/components/Table/Table';
import DataCell from 'src/components/Table/sub-components/DataCell';
import { ImageObj, ImageRes } from 'src/types/base-types';
import { imagesTableColumns } from 'src/components/Table/constants';

import NoImagesSVG from 'src/assets/svg/undraw_upload_image_re_svxx.svg';

type Props = {
    availableImages: ImageRes,
    onImagePredict: (selectedImage: ImageObj) => void,
    openImageUploadModal: () => void,
}
const ImagesTable: React.FC<Props> = ({
    availableImages,
    onImagePredict,
    openImageUploadModal,
}) => {
    const rows = useMemo(() => availableImages.result.map((image) => (
        <TableRow
            key={image.url}
        >
            <DataCell
                data={image.filename}
                isMain
            />
            <DataCell
                data={image.size}
                units="bytes"
            />
            <DataCell
                data={image.uploadTime}
                type="date"
            />
            <TableCell>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onImagePredict(image)}
                >
                    Predict
                </Button>
            </TableCell>
        </TableRow>
    )), [availableImages]);

    // Add Logic here for pagination/sorting/filtering controlled from action bar

    //
    return (
        <>
            <Table
                headerColumns={imagesTableColumns}
                rows={rows}
            />
            {rows.length === 0 && (
                <div
                    className="images-panel--view--status"
                    onClick={openImageUploadModal}
                >
                    <img
                        src={NoImagesSVG}
                        alt="No images uploaded"
                    />
                    <h3>
                        Upload an image to get started
                    </h3>
                </div>
            )}
        </>
    );
};

export default ImagesTable;
