import axios from 'axios';

import {
    handleConfigureAuth,
    handleChangeRequestHeader,
    handleAuthError,
    handleGeneralError,
    handleNetworkError,
} from './tools';

// 请求拦截器
axios.interceptors.request.use((config) => {
    config = handleChangeRequestHeader(config);   // 请求的调整
    config = handleConfigureAuth(config);   // 添加认证请求头

    return config;
})

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        if (response.status !== 200) return Promise.reject(response.status);
        handleAuthError(response.data.errno);
        handleGeneralError(response.data.errno, response.data.msg);
    },
    (err) => {
        handleNetworkError(err.response.status);
        Promise.reject(err.response);
    }
);


// GET请求
/*
    Input:
        url
        params参数
        cleanFn
*/
export const Get = (url, params={}, cleanFn) => {
    return new Promise((resolve) => {
        axios
            .get(url, { params })
            .then((result) => {
                let res;
                if (cleanFn !== undefined) {
                    res = cleanFn(result.data);
                } else {
                    res = result.data;
                }
                resolve([null, res]);
            })
            .catch(err => {
                resolve([err, undefined]);
            });
    });
};

// POST请求
/*
    Input:
        url
        data
        params参数
*/
export const Post = (url, data, params) => {
    return new Promise((resolve) => {
        axios
            .post(url, data, { params })
            .then(result => {
                resolve([null, result.data]);
            })
            .catch(err => {
                resolve([err, undefined]);
            });
    });
};

