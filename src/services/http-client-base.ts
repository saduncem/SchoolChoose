import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import _config from '../config/index';

declare module 'axios' {
   interface AxiosResponse<T = any> extends Promise<T> { }
}

abstract class HttpClient {

   protected readonly instance: AxiosInstance;

   public constructor(apiControllerKey: string) {
      this.instance = axios.create({
         baseURL: `${_config.baseApiUrl}/${apiControllerKey}/`,
         timeout: _config.requestTimeout
      });

      this._initializeRequestInterceptor();
      this._initializeResponseInterceptor();
   }

   private _initializeRequestInterceptor = () => {
      this.instance.interceptors.request.use(
         this._handleRequest,
         this._handleError
      );
   };

   private _initializeResponseInterceptor = () => {
      this.instance.interceptors.response.use(
         this._handleResponse,
         this._handleError
      );
   };

   private _handleRequest = (config: AxiosRequestConfig) => {

      config.withCredentials = true;

      return config;
   };

   private _handleResponse = ({ data }: AxiosResponse): any => {
      if (data.statusCode === undefined) {
         return Promise.resolve({ data });
      }

      // if (_config.isDevelopment) {
      //    console.info('✉️ ', data);
      // }

      if (data.statusCode === 200 || data.statusCode === 302)
         return Promise.resolve({ data });

      if (data.statusCode === 401) {
         // deleteCookie('cookie', '/');

         window.location.reload();
      }

      return Promise.resolve({ error: data });
   };

   private _handleError = (error: any) => {
      let message = 'Network Error.';

      if (typeof error !== 'undefined') {
         if (error.hasOwnProperty('message')) {
            message = error.message;
         }
      }

      if (typeof error.response !== 'undefined') {

         if (error.response.status === 401) {
            message = 'UnAuthorized';

            // deleteCookie('cookie', '/');

          window.location.replace(_config.signInUrl);
         } else if (error.response.status === 404) {
            message = 'API Route is Missing or Undefined';
         } else if (error.response.status === 405) {
            message = 'API Route Method Not Allowed';
         } else if (error.response.status >= 500) {
            message = 'Server Error';
         }

         //Try to Use the Response Message
         if (error.hasOwnProperty('response') && error.response.hasOwnProperty('data')) {
            if (error.response.data.hasOwnProperty('message') && error.response.data.message.length > 0) {
               message = error.response.data.message;
            }
         }
      }

      error.message = message;

      return Promise.resolve({ error });
   };
}

export default HttpClient;