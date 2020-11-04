// 上传工具库
import * as upload from './lib/upload';

export const { getToken } = upload; // 获取token
export const { uploadToQiniu } = upload;
export const { chunkUploadToQiniu } = upload;
export const { uploadBase64ToQiniu } = upload;
export const { createUploadHeaders } = upload;

/**
 * 微应用从localStorage中获取城市ID
 */
export function getCurrentCity() {
    const mainVuex = window.localStorage.getItem('mainVuex');

    try {
        if (mainVuex) {
            const systemJson = JSON.parse(mainVuex).system;

            return systemJson.curCity;
        }
    } catch (e) {
        return {
            id: '510100',
            name: '成都',
        };
    }

    return {
        id: '510100',
        name: '成都',
    };
}

/**
 * API工具函数
 * @param {Object} api api列表
 * @param {Function} handle 请求句柄
 */
export function extendApi(
    api = {},
    handle = () => {}
) {
    const result = {};

    Object.keys(api).forEach(key => {
        result[key] = (...args) => handle(api[key], ...args);
    });

    return result;
}

export default {
    getCurrentCity,
    extendApi,
    getToken,
    uploadToQiniu,
    chunkUploadToQiniu,
    uploadBase64ToQiniu,
    createUploadHeaders,
};
