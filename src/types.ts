export interface AccessTokenType {
  access_token: string;
  refresh_token: string;
  access_token_expiresAt: string;
  refresh_token_expiresAt: string;
  scopes: string[];
}

export interface KakaoSDK {
  init: (appKey: string) => Promise<void>;
  getAccessToken: () => Promise<AccessTokenType | undefined>;
  getProfile: () => Promise<any>;
  login: () => Promise<AccessTokenType | undefined>;
  loginWithNewScopes: (scopes: string[]) => Promise<AccessTokenType | undefined>;
  logout: () => Promise<void>;
  unlink: () => Promise<void>;
}
