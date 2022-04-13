import { AxiosRequestHeaders, Method } from 'axios';

declare global {
    declare interface currentCity {
        id: string;
        name: string;
    }

    declare type requestParams = Record<string, string | number | boolean>

    declare interface requestOptions {
        url: string,
        method: Method,
        headers?: AxiosRequestHeaders,
        params?: requestParams,
        data?: requestParams
    }
}
