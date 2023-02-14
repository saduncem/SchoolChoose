import { ILoyalityModel } from "../Loyality";
export interface IOperaUserInfo {
    NameId: number
    name?: string
    lastName: string
    reservationNo?: number
    resort: string,
    cinsiyet:string,
    uyruk:string,
    uyelikTipi:string,
    ConfirmationNo:string,
    membershipDetail: ILoyalityModel,
    Source :string
    isHotelRunner:boolean,
    isExistCampaing:boolean
 }
 export interface IloyaltyMembershipPointModel {
    accountEarnings:number,
    accountNo:string,
    accountSpendings:number,
    activeBalance:any | undefined,
    holdBalance:number,
    potentialBalance:number,
    totalBalance:number,
    id:number,
    uuid:string
  }
  export interface IloyaltyProgramPointConversionModel {
   targetAmount:number  | undefined,
   sourceAmount:number  | undefined,
   targetUnit:number  | undefined,
 }
 export interface IloyaltyCampaing {
  statusCode: 100 |200,
  status:string  | undefined,
  data:any  | undefined,
}
