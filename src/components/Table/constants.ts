export const imagesTableColumns = [
    'Filename',
    'Size',
    'Upload Time',
    '',
];

export const predictionsTableColumns = [
    'Title',
    'Description',
    'Started at',
    '',
];

export type HeaderColumns = typeof imagesTableColumns | typeof predictionsTableColumns;

export const tooltips: {[key: string]: string} = {
    Title: 'Title of the prediction',
    Description: 'Description of the prediction',
    'Started at': 'Time the prediction started',
    Filename: 'Name of the image',
    Size: 'Size of the image',
    'Upload Time': 'Time of Upload',
};
