import HttpClient from '../http-client-base';

import { IResponseModel } from '../../models';
import { IOperaUserInfo,IloyaltyMembershipPointModel,IloyaltyProgramPointConversionModel,IloyaltyCampaing} from '../../models/OperaUserInfo/index';
import axios from 'axios';
import Config from '../../config';
import { AxiosRequestConfig } from 'axios';

let InfoAxiosConfig: AxiosRequestConfig = {
   method: 'GET',
   timeout: Config.externalRequestTimeout,
   withCredentials: false,
   headers: {
    'Authorization': `Bearer ${Config.token}`,
   }
 }

export class LoyalityApiService extends HttpClient {
   public constructor() {
      super('loyality');
   }

  
   public getUserInfo = async (confirmationNo: any) => await this.instance.get<IResponseModel<IOperaUserInfo>>(`user-info/${confirmationNo}`);
   public getDomainUser= async () => await this.instance.get<IResponseModel<string>>(`GetUserName`);
   public getCustomerById = async (nameId: number) => {
    InfoAxiosConfig.params = {
      'externalId': nameId
    }

    return await axios.get(Config.baseApiUrl, InfoAxiosConfig);
   }
}

export const loyalityApiService = new LoyalityApiService();