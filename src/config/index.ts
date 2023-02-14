interface IConfig {
  baseApiUrl: string,
  signInUrl: string,
  isDevelopment: boolean,
  requestTimeout: number,
  externalRequestTimeout: number,
  divanLoyalityToken: string,
  divanSystemId: string,
  divanGetUserInfoApiUrl: string,
  accountsByLoyaltyMembershipUrl: string
}

// let Config: IConfig =  {
//   baseApiUrl: process.env.BASE_API_URL ?? 'https://localhost:5001/',
//   isDevelopment: process.env.NODE_ENV === 'development',
//   requestTimeout: process.env.REQUEST_TIMEOUT ? parseInt(process.env.REQUEST_TIMEOUT) : 1000 * 60, //  MiliSecond
//   externalRequestTimeout: process.env.EXTERNAL_REQUEST_TIMEOUT ? parseInt(process.env.EXTERNAL_REQUEST_TIMEOUT) : 1000 * 60, //  MiliSecond
//   divanLoyalityToken: process.env.DIVAN_LOYALITY_TOKEN ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsibXMvYWRtaW4iLCJtcy91c2VyIiwibXcvYWRtaW5hcHAiXSwidXNlcl9uYW1lIjoidXNlciIsInNjb3BlIjpbInJvbGVfdXNlciJdLCJsYW5nQ29kZSI6IlRSIiwidXNyX25hbWUiOiJ1c2VyIiwiZXhwIjoxNjcwNTg1NzQ3LCJ1c2VySWQiOjIsImF1dGhvcml0aWVzIjpbInJvbGVfdXNlciIsIkFETUlOIl0sImp0aSI6ImQyYWU2YTEzLTE2Y2ItNGY2Yi04OWZjLThlNDY4YzlhYTQ4YyIsImVtYWlsIjoiZW1haWwyIiwiY2xpZW50X2lkIjoiYWRtaW5hcHAifQ.v-xIGNeQV-MMxSswSVQiQXJ8oRRzKt8-ovT-lXymn-s', // Bearer
//   divanSystemId: process.env.DIVAN_SYSTEM_ID ?? 'OPERA',
//   divanGetUserInfoApiUrl: process.env.DIVAN_GET_USER_API_URL ?? 'https://divanloyaltydev.cfapps.eu10.hana.ondemand.com/customer/getById'
// };

let Config: IConfig =  {
  baseApiUrl: 'https://localhost:5001',
  signInUrl: 'https://localhost:5001/Account/SignIn',
  isDevelopment: true,
  requestTimeout: 1000 * 60, //  MiliSecond
  externalRequestTimeout: 1000 * 60, //  MiliSecond
  divanLoyalityToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsibXMvYWRtaW4iLCJtcy91c2VyIiwibXcvYWRtaW5hcHAiXSwidXNlcl9uYW1lIjoidXNlciIsInNjb3BlIjpbInJvbGVfdXNlciJdLCJsYW5nQ29kZSI6IlRSIiwidXNyX25hbWUiOiJ1c2VyIiwiZXhwIjoxNjcwNTg1NzQ3LCJ1c2VySWQiOjIsImF1dGhvcml0aWVzIjpbInJvbGVfdXNlciIsIkFETUlOIl0sImp0aSI6ImQyYWU2YTEzLTE2Y2ItNGY2Yi04OWZjLThlNDY4YzlhYTQ4YyIsImVtYWlsIjoiZW1haWwyIiwiY2xpZW50X2lkIjoiYWRtaW5hcHAifQ.v-xIGNeQV-MMxSswSVQiQXJ8oRRzKt8-ovT-lXymn-s', // Bearer
  divanSystemId: 'OPERA',
  divanGetUserInfoApiUrl: 'https://divanloyaltydev.cfapps.eu10.hana.ondemand.com/customer/getById',
  accountsByLoyaltyMembershipUrl:'https://divanloyaltydev.cfapps.eu10.hana.ondemand.com/account/loyaltyMembershipAccounts/'
};

export default Config;