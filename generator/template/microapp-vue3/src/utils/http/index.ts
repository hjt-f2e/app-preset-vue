/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useUserStore } from '@/store/user';
import { useSettingsStore } from '@/store/settings';

import {
    SUCCESS,
    ERROR_TOKEN_INVALID,
    ERROR_TOKEN_EXPIRE,
    ERROR_NEED_LOGIN,
    ERROR_TOKEN_EMPTY,
    ERROR_NO_POWER
} from './code';

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1200000
});

instance.interceptors.request.use((config) => {
    const { getToken } = useUserStore();
    const token = getToken();

    if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Token = token;
    } else {
        config.headers = {
            Authorization: `Bearer ${token}`,
            Token: token
        };
    }

    return config;
}, error => {
    ElMessage({
        message: '网络错误,请稍后再试',
        type: 'error',
        duration: 5000
    });

    return Promise.reject(error);
});

function onFulfilled(response: AxiosResponse) {
    const res = response.data;

    if (response.status !== 200) {
        return Promise.reject(
            new Error(`网络请求失败，code${response.status}`)
        );
    }

    switch (res.code) {
    case ERROR_NEED_LOGIN:
    case ERROR_TOKEN_EMPTY:
    case ERROR_TOKEN_EXPIRE:
    case ERROR_TOKEN_INVALID: {
        ElMessageBox
            .confirm(res.msg, '温馨提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                const { resetToken } = useUserStore();
                resetToken();

                const redirectUrl = `${process.env.VUE_APP_MAIN_APP_URL}${window.location.pathname}`;
                window.location.href = `${process.env.VUE_APP_SSO_LOGIN_URL}?redirect_url=${redirectUrl}`;
            });

        return Promise.reject(new Error(`登陆已失效，code${res.code}`));
    }
    case ERROR_NO_POWER: {
        let errorUrl = '';
        if (response.config.url && response.config.baseURL) {
            errorUrl = response.config.url.replace(response.config.baseURL, '');
        }

        ElMessage({
            message: '您没有该模块权限，请联系管理员开通',
            type: 'error',
            duration: 5000
        });

        return Promise.reject(new Error(`${errorUrl}无权限，code${res.code}`));
    }

    default:
        if (res.code !== SUCCESS) {
            ElMessage({
                message: res.msg,
                type: 'error',
                duration: 5000
            });

            return Promise.reject(res);
        }
    }

    return Promise.resolve(res);
}

export function axiosReqest(options: requestOptions): Promise<any> {
    const {
        url,
        method = 'GET',
        data = {},
        headers = {}
    } = options;

    const reqConfig: AxiosRequestConfig = {
        url,
        method,
        headers
    };

    reqConfig.params = {};

    if (method.toUpperCase() === 'GET') {
        reqConfig.params = data || {};
    } else {

        reqConfig.data = data || {};
    }

    // 加上通用参数 city_id 和 time
    const { cityId } = useSettingsStore();
    reqConfig.params.city_id = cityId;
    reqConfig.params.time = Date.now();

    return instance(reqConfig)
        .then(response => onFulfilled(response))
        .catch(err => Promise.reject(err));
}

export const get = (url: string, data = {}, headers = {}): Promise<any> => axiosReqest({
    method: 'GET',
    url,
    data,
    headers
});

export const post = (url: string, data = {}, headers = {}): Promise<any> => axiosReqest({
    method: 'POST',
    url,
    data,
    headers
});

export const patch = (url: string, data = {}, headers = {}): Promise<any> => axiosReqest({
    method: 'PATCH',
    url,
    data,
    headers
});

export const put = (url: string, data = {}, headers = {}): Promise<any> => axiosReqest({
    method: 'PUT',
    url,
    data,
    headers
});

export const deleteReq = (url: string, data = {}, headers = {}): Promise<any> => axiosReqest({
    method: 'DELETE',
    url,
    data,
    headers
});

export default {
    get,
    post,
    patch,
    put,
    delete: deleteReq,
    request: instance
};
