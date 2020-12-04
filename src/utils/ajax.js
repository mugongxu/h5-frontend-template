/**
 * 通用AJAX客户端
 */
import axios from 'axios';
import qs from 'querystring';
import { errorNotify } from './apiErrorHandler';
import router from '@/router';

const ajax = axios.create({
    timeout: 10000
});

ajax.interceptors.request.use((config) => {
    // config.url = process.env.fortuneUrl + config.url;
    const newConf = { ...config };
    // 在这里做请求头定制处理
    if (newConf.contentType === 'form') {
        newConf.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        newConf.data = qs.stringify(newConf.data);
    } else if (config.contentType) {
        newConf.headers['Content-Type'] = newConf.contentType;
        newConf.data = qs.stringify(newConf.data);
    } else {
        newConf.headers['Content-Type'] = 'application/json';
    }
    delete newConf.contentType;
    return newConf;
});

ajax.interceptors.response.use((response) => {
    // 在这里可以对返回做统一错误拦截
    if (response.status !== 200) {
        errorNotify({
            errorMessage: `${response.status}`
        });
        Promise.reject(new Error(`Http 状态异常 ${response.status}`));
    }
    if (response.data.ret) {
        return response;
    } else {
        errorNotify({
            errorMessage: `${(response.data.res || {}).errorMsg}`
        });
        // 需要登录
        if ((response.data.res || {}).errorCode === 101007) {
            router.push('/error/identify');
        }
        return Promise.reject(new Error(`接口异常 ${(response.data.res || {}).errorMsg}`));
    }
    // return response;
}, (error) => {
    errorNotify({
        errorMessage: '服务器异常'
    });
    return Promise.reject(error);
});

export default ajax;
