interface IConfig {
  baseApiUrl: string,
  cities: string,
  isDevelopment: boolean,
  requestTimeout: number,
  externalRequestTimeout: number,
  token: string,
  getUserInfoApiUrl: string,
  accountsByLoyaltyMembershipUrl: string
}

let Config: IConfig =  {
  baseApiUrl: 'http://10.20.255.2:8080',
  cities: 'http://10.20.255.2:8080/egitim/cities',
  isDevelopment: true,
  requestTimeout: 1000 * 60, //  MiliSecond
  externalRequestTimeout: 1000 * 60, //  MiliSecond
  token: '', // Bearer
  getUserInfoApiUrl: 'https://',
  accountsByLoyaltyMembershipUrl:'https://'
};

export default Config;