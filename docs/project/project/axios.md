### axios请求
#### axios.js文件
```js
import axios from 'axios';
import { reqSuccess, reqError, resSuccess, resError } from './interceptors.js';

/**
 *
 * @param baseURL base路径
 * @param url 请求路径
 * @param params 请求参数
 * @param method 请求类型
 * @param customHeaders 自定义头部信息
 * @param customConfig 自定义配置信息
 */

const { VUE_APP_BASE_API } = process.env

const axiosInstance = axios.create({
  baseURL: `${VUE_APP_BASE_API}`,
  timeout: 600000,
});

// 路由拦截
axiosInstance.interceptors.request.use(reqSuccess, reqError);
axiosInstance.interceptors.response.use(resSuccess, resError);

// 接口处理
export const fetch = (
  method,
  url,
  params,
  customHeaders = {},
  customConfig = {}
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'systemDomain': document.domain
    },
    customConfig,
    customHeaders,
  };

  // 处理不同请求方式
  const methodName = method?.toLocaleLowerCase() || '';
  const type = ['get', 'delete'].includes(methodName) ? 'params' : 'data';
  config[type] = params;
  if (method) {
    if (type === 'params') {
      if(!params ) {
        config.params = {}
      }
      config.params['_t'] = Date.parse(new Date()) / 1000
      return axiosInstance[method](url, config)
    } else {
      return axiosInstance[method](url, params, config)
    }
  } else {
    return Promise.reject(new Error());
  }
};
export default fetch;
```
#### interceptors.js（路由拦截）
```js
const { VUE_APP_APPKEY, VUE_APP_SECRETKEY } = process.env;
export const reqSuccess = (config) => {
  const { customHeaders, customConfig } = config;
  config = { ...config, ...customConfig };
  config.headers = { ...config.headers, ...headerSign, ...customHeaders };
  delete config.customHeaders;
  delete config.customConfig;
  return config;
};

export const reqError = (error) => {
  // 请求失败处理
  return Promise.reject(error);
};

export const resSuccess = (response) => {
  const { code } = response.data
  if (code === "601019" || code === '629053') {
    // 登出
    return
  }
  // 响应成功处理
  return response;
};

export const resError = (error) => {
  return Promise.reject(error);
};

```

### 项目使用
```js
import { fetch } from '@/utils/axios/axios.js';
export const login = (data) => fetch('post', 服务+路径, data);
export const validateLogin = (data) => fetch('get', 服务+路径, data);
```