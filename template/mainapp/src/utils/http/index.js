import axios from 'axios';
import { Modal, message } from 'ant-design-vue';
import store from '@/store';

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
    timeout: 1200000,
    retry: 3,
    retryDely: 500
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.getters['user/token']}`;
    config.headers['Auth-Token'] = store.getters['user/token'];

    return config;
}, (error) => {
    message.error({
        content: '网络错误,请稍后再试',
        duration: 5000
    });

    return Promise.reject(error);
});

function onFulfilled(response) {
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
        Modal.confirm({
            title: '温馨提示',
            content: res.msg,
            okText: '重新登录',
            keyboard: false,
            onOk() {
                store.dispatch('user/resetToken').then(() => {
                    const redirectUrl = `${process.env.VUE_APP_MAIN_APP_URL}${window.location.pathname}`;
                    window.location.href = `${process.env.VUE_APP_SSO_LOGIN_URL}?redirect_url=${redirectUrl}`;
                });
            }
        });

        return Promise.reject(new Error(`登陆已失效，code${res.code}`));
    }
    case ERROR_NO_POWER: {
        const errorUrl = response.config.url.replace(response.config.baseURL, '');

        message.error({
            content: '您没有该模块权限，请联系管理员开通'
        });

        return Promise.reject(new Error(`${errorUrl}无权限，code${res.code}`));
    }

    default:
        if (res.code !== SUCCESS) {
            message.error({
                content: res.msg,
                duration: 5000
            });

            return Promise.reject(res);
        }
    }

    return Promise.resolve(res);
}

export function axiosReqest({
    method = 'GET',
    url,
    data = {},
    header = {}
}) {
    const reqOpts = {
        url,
        method,
        header
    };

    reqOpts.params = {};

    if (method.toUpperCase() === 'GET') {
        reqOpts.params = data || {};
    } else {

        reqOpts.data = data || {};
    }

    // 加上通用参数 city_id 和 time
    reqOpts.params.city_id = store.getters['settings/cityId'];
    reqOpts.params.time = Date.now();

    return instance(reqOpts)
        .then(response => onFulfilled(response))
        .catch(err => Promise.reject(err));
}

export const get = (url, data = {}, headers = {}) => axiosReqest({
    method: 'GET',
    url,
    data,
    headers
});

export const post = (url, data = {}, headers = {}) => axiosReqest({
    method: 'POST',
    url,
    data,
    headers
});

export const patch = (url, data = {}, headers = {}) => axiosReqest({
    method: 'PATCH',
    url,
    data,
    headers
});

export const put = (url, data = {}, headers = {}) => axiosReqest({
    method: 'PUT',
    url,
    data,
    headers
});

export const deleteReq = (url, data = {}, headers = {}) => axiosReqest({
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
