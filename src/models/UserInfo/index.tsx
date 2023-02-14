import { IMembershipDetail } from "../MembershipDetail";
export interface IUserInfo {
    NameId: number
    name?: string
    lastName: string
    reservationNo?: number
    resort: string,
    cinsiyet:string,
    uyruk:string,
    uyelikTipi:string,
    ConfirmationNo:string,
    membershipDetail: IMembershipDetail,
    Source :string
    isHotelRunner:boolean,
    isExistCampaing:boolean
 }
