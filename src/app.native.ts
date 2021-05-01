import { NativeModules } from 'react-native';
import { AccessTokenType, KakaoSDK } from './types';

const { RNAKakaoSDK } = NativeModules;

export const init = async (appKey: string) => {
  await RNAKakaoSDK.init(appKey);
};

export const isInitialized = async () => {
  return await RNAKakaoSDK.isInitialized();
};

const dateToSeconds = (str: string): number => {
  const v = new Date(str?.replace(' ', 'T')).getTime();
  const n = new Date().getTime();
  return Math.floor((v - n) / 1000);
};
export const login = async () => {
  const result = await RNAKakaoSDK.login();
  return {
    access_token: result?.accessToken,
    refresh_token: result?.refreshToken,
    scopes: result?.scopes,
    expires_in: dateToSeconds(result?.accessTokenExpiresAt),
    refresh_token_expires_in: dateToSeconds(result?.refreshTokenExpiresAt),
  };
};

export const loginWithNewScopes = async (scopes: string[]) => {
  const result = await RNAKakaoSDK.loginWithNewScopes(scopes);
  return {
    access_token: result?.accessToken,
    refresh_token: result?.refreshToken,
    scopes: result?.scopes,
    expires_in: dateToSeconds(result?.accessTokenExpiresAt),
    refresh_token_expires_in: dateToSeconds(result?.refreshTokenExpiresAt),
  };
};

export const logout = async () => {
  await RNAKakaoSDK.logout();
};

export const unlink = async () => {
  await RNAKakaoSDK.unlink();
};

export const getAccessToken = async () => {
  const result = await RNAKakaoSDK.getAccessToken();
  return {
    access_token: result?.accessToken,
    refresh_token: result?.refreshToken,
    scopes: result?.scopes,
    expires_in: dateToSeconds(result?.accessTokenExpiresAt),
    refresh_token_expires_in: dateToSeconds(result?.refreshTokenExpiresAt),
  };
};

export const getProfile = async () => {
  const result = await RNAKakaoSDK.getProfile();
  console.log(result);
  return undefined;
};

const app: KakaoSDK = {
  init,
  isInitialized,
  getAccessToken,
  getProfile,
  login,
  loginWithNewScopes,
  logout,
  unlink,
};

export default app;
