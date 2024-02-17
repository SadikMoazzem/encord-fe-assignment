import axios from 'axios';
import { Options, makeUseAxios } from 'axios-hooks';

// Add Logic here for JWT

const encordAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// request interceptor to add token to request headers
encordAxios.interceptors.request.use(
    async (config) => config,
    (error) => Promise.reject(error),
);

// response interceptor intercepting err responses like 401 and 403
encordAxios.interceptors.response.use(
    (response) => response,
    async (error) => Promise.reject(error),
);

const defaultOptions: Options = {
    manual: true,
    useCache: true,
    autoCancel: false,
    ssr: false,
};

const useEncordAxios = makeUseAxios({ axios: encordAxios, defaultOptions });

export {
    defaultOptions,
    encordAxios,
    useEncordAxios,
};
