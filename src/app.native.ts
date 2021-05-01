import { NativeModules } from 'react-native';
import { KakaoSDK } from './types';

const { RNAKakaoSDK } = NativeModules;

export const init = async (appKey: string) => {
  await RNAKakaoSDK.init(appKey);
};

export const isInitialized = async () => {
  return await RNAKakaoSDK.isInitialized();
};

export const login = async () => {
  const result = await RNAKakaoSDK.login();
  console.log(result);
  return undefined;
};

export const loginWithNewScopes = async (scopes: string[]) => {
  const result = await RNAKakaoSDK.loginWithNewScopes(scopes);
  console.log(result);
  return undefined;
};

export const logout = async () => {
  await RNAKakaoSDK.logout();
};

export const unlink = async () => {
  await RNAKakaoSDK.unlink();
};

export const getAccessToken = async () => {
  const result = await RNAKakaoSDK.getAccessToken();
  console.log(result);
  return undefined;
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
