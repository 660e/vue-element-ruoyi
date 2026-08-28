import axios from 'axios';

export class Request {
  #instance;
  #setupInterceptors() {
    this.#instance.interceptors.request.use(
      (config) => {
        const { requestInterceptors } = config;
        if (requestInterceptors) {
          return requestInterceptors(config);
        } else {
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
        } else {
          if (response.data?.code === 200) {
            return response.data;
          } else {
            return response;
          }
        }
      },
      (error) => {
        switch (error.response.status) {
          case 401:
            console.log('401');
            break;
          case 404:
            console.log('404');
            break;
          case 500:
            console.log('500');
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
