export interface ILoyalityModel {
  customerId:number,
  name: string,
  lastName: string,
  uuid:string,
  invoiceHeaderCount: IloyaltyMembershipListModel,
}

export interface IloyaltyMembershipListModel {
  uuid:string,
  loyaltyMembershipId:string,
  id:number
}
