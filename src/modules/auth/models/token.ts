export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  sub: string;
  login: string;
}
