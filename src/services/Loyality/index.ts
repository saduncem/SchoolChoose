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
    'Authorization': `Bearer ${Config.divanLoyalityToken}`,
    'X-CLL-EXTERNAL-SYSTEM-ID': Config.divanSystemId
   }
 }

export class LoyalityApiService extends HttpClient {
   public constructor() {
      super('loyality');
   }

  
   public getUserInfo = async (confirmationNo: any) => await this.instance.get<IResponseModel<IOperaUserInfo>>(`user-info/${confirmationNo}`);
   public getDomainUser= async () => await this.instance.get<IResponseModel<string>>(`GetUserName`);
   public getCampainInfo = async (loyaltyMembershipUid: string) => await this.instance.get<IResponseModel<IloyaltyCampaing>>(`capmaing-info/${loyaltyMembershipUid}`);
   public getCustomerPoint = async (loyaltyMembershipUid: string) => await this.instance.get<IResponseModel<IloyaltyMembershipPointModel>>(`customer-point-info/${loyaltyMembershipUid}`);
   public getlLoyaltyProgramPointConversion = async () => await this.instance.get<IResponseModel<IloyaltyProgramPointConversionModel[]>>(`getlLoyaltyProgramPointConversion`);
   public SendlLoyaltyHoldForCustomer = async (data:any) => await this.instance.post<IResponseModel<any>>(`sendlLoyaltyHoldForCustomer`,data);
   public SendlLoyaltyLOSTHoldForCustomer = async (data:any) => await this.instance.post<IResponseModel<any>>(`sendlLoyaltyHoldLossForCustomer`,data);
   public SendlLoyaltyCancelHoldForCustomer = async (data:any) => await this.instance.post<IResponseModel<any>>(`sendlLoyaltyHoldCancelForCustomer`,data);
   public SetCampign = async (data:any) => await this.instance.post<IResponseModel<any>>(`setCampign`,data);
   public setUpdateCampign = async (data:any) => await this.instance.post<IResponseModel<any>>(`setUpdateCampign`,data);
   public getSelectCamping = async (data:any) => await this.instance.post<IResponseModel<any>>(`getSelectCamping`,data);
   public sendSmsValidation = async (data:any) => await this.instance.post<IResponseModel<any>>(`sendValidationSms`,data);
   public getCustomerById = async (nameId: number) => {
    InfoAxiosConfig.params = {
      'externalId': nameId
    }

    return await axios.get(Config.divanGetUserInfoApiUrl, InfoAxiosConfig);
   }
}

export const loyalityApiService = new LoyalityApiService();