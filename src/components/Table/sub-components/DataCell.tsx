import * as React from 'react';
import TableCell from '@mui/material/TableCell';

import { Tooltip } from '@mui/material';

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
    hour12: true,
    timeZone: 'UTC', // Adjust time zone as needed
};

type Props = {
    data: any,
    type?: 'date' | 'string' | 'number',
    units?: string,
    isMain?: boolean,
}
const DataCell: React.FC<Props> = ({
    data, type, units, isMain,
}) => {
    let formattedData = data;
    if (type === 'date') {
        formattedData = new Intl.DateTimeFormat('en-GB', options).format(new Date(data));
    }
    return (
        <TableCell component={isMain ? 'th' : 'span'} scope={isMain ? 'row' : ''}>
            <Tooltip title={formattedData} enterTouchDelay={0}>
                <span>{`${formattedData} ${units || ''}`}</span>
            </Tooltip>
        </TableCell>
    );
};

export default DataCell;
