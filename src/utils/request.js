import axios from 'axios';
import { ElMessage } from 'element-plus';

import { useAppStore } from '@/stores';
import { getLocalStorage } from '@/utils';

function handleForbidden() {
  const appStore = useAppStore();
  if (!appStore.isForbidden) {
    appStore.setIsForbidden(true);
    ElMessage.error('登录过期，请重新登录');
  }
}

export class Request {
  #instance;
  #setupInterceptors() {
    this.#instance.interceptors.request.use(
      (config) => {
        const { requestInterceptors } = config;
        if (requestInterceptors) {
          return requestInterceptors(config);
        } else {
          config.headers.Authorization = `Bearer ${getLocalStorage('token')}`;
          return config;
        }
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.#instance.interceptors.response.use(
      (response) => {
        const { responseInterceptors } = response.config;
        if (responseInterceptors) {
          return responseInterceptors(response);
        } else if (response.data?.code) {
          switch (response.data.code) {
            case 200:
              return response.data;
            case 401:
              handleForbidden();
              break;
            default:
              ElMessage.error(response.data.msg);
              break;
          }
        } else {
          return response;
        }
      },
      (error) => {
        switch (error.response.status) {
          case 401:
            handleForbidden();
            break;
          default:
            console.log(error.response.status);
        }
        return Promise.reject(error);
      },
    );
  }

  constructor(config) {
    this.#instance = axios.create(config);
    this.#setupInterceptors();
  }

  post(url, config, options) {
    return this.#instance({ method: 'post', url, ...config, ...options });
  }

  get(url, config, options) {
    return this.#instance({ method: 'get', url, ...config, ...options });
  }

  put(url, config, options) {
    return this.#instance({ method: 'put', url, ...config, ...options });
  }

  delete(url, config, options) {
    return this.#instance({ method: 'delete', url, ...config, ...options });
  }
}

export const request = new Request({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});
