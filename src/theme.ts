import { ThemeOptions, createTheme } from '@mui/material';

const styleOverrides: ThemeOptions = {
    palette: {
        primary: {
            main: '#5e44ff',
        },
        secondary: {
            main: '#65c427',
        },
    },
    components: {
        MuiTabs: {
            styleOverrides: {
                root: {
                    maxHeight: 'inherit',
                },
                indicator: {
                    backgroundColor: '#5e44ff',
                },
            },
        },
        // MuiButton: {
        //     variants: [
        //         {
        //             props: { variant: 'bkwai_primary' },
        //             style: {
        //                 backgroundColor: '#009573',
        //                 color: '#fff',
        //                 width: '100%',
        //                 '&:hover': {
        //                     backgroundColor: '#009573eb',
        //                 },
        //             },
        //         },
        //         {
        //             props: { variant: 'bkwai_primary_disabled' },
        //             style: {
        //                 backgroundColor: '#ccc',
        //                 color: '#fff',
        //                 width: '100%',
        //                 '&:hover': {
        //                     backgroundColor: '#ccc',
        //                 },
        //             },
        //         },
        //         {
        //             props: { variant: 'bkwai_secondary_light' },
        //             style: {
        //                 border: 'none',
        //                 color: '#fff',
        //                 width: '100%',
        //             },
        //         },
        //         {
        //             props: { variant: 'bkwai_outlined' },
        //             style: {
        //                 border: '1px solid #124069',
        //                 color: '#124069',
        //                 width: '100%',
        //             },
        //         },
        //         {
        //             props: { variant: 'bkwai_outlined_form' },
        //             style: {
        //                 border: '1px solid rgba(0, 0, 0, 0.23)',
        //                 color: '#1d1d1d',
        //                 width: '100%',
        //                 height: '42px',
        //                 '&:hover': {
        //                     border: '1px solid rgba(0, 0, 0, 0.87)',
        //                     backgroundColor: '#fff',
        //                 },
        //             },
        //         },
        //         {
        //             props: { variant: 'bkwai_outlined_nobackground' },
        //             style: {
        //                 border: '1px solid #124069',
        //                 color: '#124069',
        //                 width: '100%',
        //             },
        //         },
        //         {
        //             props: { variant: 'bkwai_error' },
        //             style: {
        //                 backgroundColor: '#CC0000',
        //                 color: '#fff',
        //                 width: '100%',
        //                 '&:hover': {
        //                     backgroundColor: '#e70000',
        //                 },
        //             },
        //         },
        //         {
        //             props: { variant: 'bkwai_outlined_error' },
        //             style: {
        //                 backgroundColor: '#ff000000',
        //                 border: '1px solid #CC0000',
        //                 color: '#CC0000',
        //                 width: '100%',
        //             },
        //         },
        //     ],
        // },
        // MuiPaper: {
        //     variants: [
        //         {
        //             props: { variant: 'bkwai' },
        //             style: {
        //                 backgroundColor: '#124069',
        //             },
        //         },
        //     ],
        // },
    },
};

export default createTheme(styleOverrides);
