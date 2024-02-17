import { Options } from 'axios-hooks';

import { useEncordAxios, defaultOptions } from 'src/encordAxios';
import { ImagePrediction, PredictionRes } from 'src/types/base-types';

const defaultParams = {
    // per_page: 10,
};

// Not using this hook as we are mocking the data for now

// export function useImages(params?: any, options?: Options) {
//     return useEncordAxios<GenericAPI<ImageObj>>(
//         {
//             url: '/images',
//             method: 'GET',
//             params: { ...defaultParams, ...params },
//         },
//         { ...defaultOptions, ...options },
//     );
// }

export function useCreatePrediction(data?: ImagePrediction, options?: Options) {
    return useEncordAxios(
        {
            url: '/image-predictions',
            method: 'POST',
            params: { ...defaultParams },
            data,
        },
        { ...defaultOptions, ...options },
    );
}

export function useGetPredictions(params?: any, options?: Options) {
    return useEncordAxios<ImagePrediction[]>(
        {
            url: '/image-predictions/',
            method: 'GET',
            params: { ...defaultParams, ...params },
        },
        { ...defaultOptions, ...options },
    );
}

export function useGetPrediction(params?: any, options?: Options) {
    return useEncordAxios<PredictionRes>(
        {
            url: '/predict',
            method: 'GET',
            params: { ...defaultParams, ...params },
        },
        { ...defaultOptions, ...options },
    );
}
