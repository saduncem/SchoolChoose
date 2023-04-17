import HttpClient from '../http-client-base';

import { IResponseModel } from '../../models';
import { ICity} from '../../models/City/index';
import { IUserInfo} from '../../models/UserInfo/index';
import axios from 'axios';
import Config from '../../config';
import { AxiosRequestConfig ,HeadersDefaults} from 'axios';


let InfoAxiosConfig: AxiosRequestConfig = {
   method: 'GET',
   timeout: Config.externalRequestTimeout,
   withCredentials: false,
   headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': `application/json`,
   }
 }

export class ApiService extends HttpClient {
   public constructor() {
      super('egitim');
   }
  
   public getUserInfo = async (confirmationNo: any) => await this.instance.get<IResponseModel<IUserInfo>>(`user-info/${confirmationNo}`);
   public getCity = async () => await this.instance.get<IResponseModel<ICity>>(`/cities`);
   public getDistricts = async (cityid : any) => await this.instance.get<IResponseModel<ICity>>(`/districts/${cityid}`);
   public getDomainUser= async () => await this.instance.get<IResponseModel<string>>(`GetUserName`);
   public getCityList = async () => {
      return await axios.get(Config.cities,InfoAxiosConfig);
     }
}

export const apiService = new ApiService();