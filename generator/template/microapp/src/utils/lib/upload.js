import md5 from 'js-md5';
import * as qiniu from 'qiniu-js';
import axios from 'axios';

import api from '../../api';

export function createUploadHeaders() {
    const now = Date.now();
    const appid = '123456';
    const secret = '123456';
    const randomStr = `${Math.floor(Math.random() * 1000000)}`;
    const salt = randomStr.padEnd(7, 'abcdefg');

    return {
        'api-appid': appid, // appid
        'api-timestamp': now, // 时间戳
        'api-salt': salt, // 7位字符串
        'api-token': md5(`${appid}${secret}${now}${salt}`) // token
    };
}

const MAX_SIZE = 4 * 1024 * 1024;

// 获取文件后缀
function getFileExt(name) {
    if (!name || typeof name !== 'string') {
        return '';
    }

    const regexp = /(\.[A-z0-9]+$)/;

    if (!regexp.test(name)) {
        return '';
    }

    return name.match(regexp)[1];
}

// 将base64转换为文件
function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // eslint-disable-next-line no-plusplus
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

/**
 * 七牛云上传封装
 * @docs [https://developer.qiniu.com/kodo/sdk/1283/javascript]
 * @param file {File} 文件对象
 * @param tokenFn {Promise<any>} 获取token的函数
 * @param onProgress {Function} 进度回调函数
 * @return {Promise<string>|Promise<Error>}
 * @private
 */
function upload(file, tokenFn, onProgress) {
    return new Promise((resolve, reject) => {
        if (!(tokenFn instanceof Promise)) {
            reject(new Error('upload:fail, token type is not Promise'));
            return;
        }

        tokenFn
            .then(({ key, url, token }) => {
                const observable = qiniu.upload(file, key, token);
                observable.subscribe({
                    next(total) {
                        if (onProgress) {
                            onProgress(total);
                        }
                    },
                    error(err) {
                        reject(err);
                    },
                    complete() {
                        resolve(url);
                    }
                });
            })
            .catch(reject);
    });
}

/**
 * 创建块
 * @private
 * @return {AxiosPromise}
 */
function mkblk({ host, token }, blob, onProgress) {
    return axios({
        url: `${host}/mkblk/${blob.size}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            Authorization: `UpToken ${token}`
        },
        data: blob,
        onUploadProgress: e => {
            if (onProgress) {
                onProgress(e);
            }
        }
    });
}

/**
 * 创建文件
 * @private
 * @return {AxiosPromise}
 */
function mkfile({
    host, token, key, fSize
}, ctx) {
    return axios({
        url: `${host}/mkfile/${fSize}/key/${key}/`,
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            Authorization: `UpToken ${token}`
        },
        data: ctx
    });
}

/**
 * 通过文件名获取token
 * @param param {String} 上传入参
 * @return {Promise<Object>|Promise<Error>}
 */
export function getToken(param) {
    param.ext = getFileExt(param.fileName);
    if (!param.ext) {
        return Promise.reject(new Error('getToken:fail, file is undefined'));
    }

    return new Promise((resolve, reject) => {
        api.global
            .getUpToken(param)
            .then(result => {
                resolve(result.data);
            })
            .catch(reject);
    });
}

/**
 * 七牛云分块上传封装
 * @docs [https://developer.qiniu.com/kodo/manual/1650/chunked-upload]
 * @param file {File} 文件
 * @param onProgress {Function} 进度回调函数
 * @return {Promise<string>}
 * @private
 */
async function chunkUpload(file, onProgress) {
    const {
        token, upload_url: host, url, key
    } = await getToken({ fileName: file.name });

    const chunks = [],
        chunkLen = Math.ceil(file.size / MAX_SIZE);
    for (let i = 0; i < chunkLen; i += 1) {
        if (i + 1 === chunkLen) {
            chunks.push(file.slice(i * MAX_SIZE, file.size));
        } else {
            chunks.push(file.slice(i * MAX_SIZE, (i + 1) * MAX_SIZE));
        }
    }

    const ctxArr = [];
    let i = 1;
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chunks) {
        // eslint-disable-next-line no-await-in-loop
        const { data } = await mkblk({ host, token }, chunk, e => {
            if (onProgress) {
                onProgress({
                    loaded: e.loaded,
                    total: chunkLen,
                    percent: Math.floor(i / chunkLen * 100)
                });
            }
        });

        ctxArr.push(data.ctx);
        i += 1;
    }

    await mkfile({
        host, token, fSize: file.size, key: window.btoa(key)
    }, ctxArr.join(','));
    return url;
}

/**
 * 上传文件（支持多文件上传）
 * @param files {File|Array<File>} 需要上传文件的对象
 * @param onProgress {Function} 进度回调函数
 * @return {Promise<string>|Promise<Error>}
 */
export function uploadToQiniu(files, onProgress) {
    if (!files) {
        return Promise.reject(new Error('uploadToQiniu:fail, files is undefined'));
    }

    return new Promise((resolve, reject) => {
        if (Array.isArray(files)) {
            // eslint-disable-next-line no-shadow
            const uplodTask = files.map(({ file, onProgress }) => upload(file, getToken({
                fileName: files.name
            }), onProgress));
            Promise.all(uplodTask)
                .then(results => resolve(results))
                .catch(reject);

            return;
        }

        upload(files, getToken({ fileName: files.name }), onProgress)
            .then(result => resolve(result))
            .catch(reject);
    });
}

/**
 * 分块上传文件（不支持多文件）
 * @param file {File|Blob} 文件或二进制
 * @param onProgress {Function} 进度回调函数
 * @return {Promise<string>|Promise<Error>}
 */
export function chunkUploadToQiniu(file, onProgress) {
    if (!file || !(file instanceof File)) {
        return Promise.reject(new Error('chunkUploadToQiniu:fail, file is undefined'));
    }

    return new Promise((resolve, reject) => {
        // 小于上传最大限制就直接用h5直传
        if (file.size <= MAX_SIZE) {
            upload(file, getToken({ fileName: file.name }), onProgress)
                .then(result => resolve(result))
                .catch(reject);

            return;
        }

        chunkUpload(file, onProgress)
            .then(url => {
                resolve(url);
            })
            .catch(reject);
    });
}

/**
 * 上传文件（支持多文件上传）
 * @param data {Object|Array<Object>} 需要上传文件的对象 src:base64Url;fname:转换目标文件名;key:文件路径;
 * @param options {Object} 配置选项 is_lottery_room_image {0|1} 是否使用path文件名
 * @param onProgress {Function} 进度回调函数
 * @return {Promise<string>|Promise<Error>}
 */
export function uploadBase64ToQiniu(data, options, onProgress) {
    const files = [];

    if (!data) {
        return Promise.reject(new Error('uploadToQiniu:fail, data-base64 is undefined'));
    }

    if (Array.isArray(data)) {
        data.forEach(item => {
            files.push({ file: dataURLtoFile(item.src, item.fname), key: item.key });
        });
    }

    return new Promise((resolve, reject) => {
        if (Array.isArray(files)) {
            Promise.all(
                files.map(file => upload(
                    file.file,
                    getToken({ fileName: file.file.name, path: file.key, ...options }),
                    onProgress
                ))
            )
                .then(results => {
                    resolve(results);
                })
                .catch(reject);
        }
    });
}
