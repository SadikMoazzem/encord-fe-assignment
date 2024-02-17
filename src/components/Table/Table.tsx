import * as React from 'react';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tooltip } from '@mui/material';

import { useWindowSize } from 'usehooks-ts';
import { tooltips } from './constants';

import './table.scss';

type Props = {
    headerColumns: string[],
    rows: JSX.Element[],
}
const Table: React.FC<Props> = ({
    headerColumns,
    rows,
}) => {
    const { height } = useWindowSize();

    const availableRows = Math.floor((height - 270) / 70);
    const emptyRows = Math.max(0, availableRows - rows.length);
    return (
        <TableContainer component={Paper}>
            <MuiTable
                sx={{
                    height: '100%',
                }}
            >
                <TableHead>
                    <TableRow>
                        {headerColumns.map((header: string) => (
                            <TableCell
                                key={header}
                                sx={{
                                    fontWeight: 'bold',
                                    whiteSpace: 'wrap',
                                }}
                            >
                                <Tooltip title={header in tooltips ? tooltips[header] : ''}>
                                    <span>{header}</span>
                                </Tooltip>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => row)}
                    <TableRow
                        style={{
                            height: (80) * emptyRows,
                        }}
                    >
                        <TableCell colSpan={4} />
                    </TableRow>
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};
export default Table;
