export type GenericAPI<T> = {
    count: number;
    next?: number;
    previous?: number;
    results: T[];
}

export interface ImageObj {
    filename: string
    size: number
    uploadTime: string
    url: string
}

export type ImageRes ={
    result: ImageObj[]
}

export type ImagePrediction = {
    id?: string,
    title: string
    description: string
    prediction_start: string
    image_filename: string
}

export interface PredictionBody {
    title: string
    description: string
    imageUrl: string
}

export interface Bbox {
    x1: number
    x2: number
    y1: number
    y2: number
}

export interface Prediction {
    bbox: Bbox
    label: string
    score: string
}

export interface PredictionRes {
    description: string
    predictions: Prediction[]
}
