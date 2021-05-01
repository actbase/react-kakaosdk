import { KakaoSDK } from './types';

export const init = async () => {};

export const login = async () => {
  return undefined;
};

export const loginWithNewScopes = async (scopes: string[]) => {
  console.log(scopes);
  return undefined;
};

export const logout = async () => {};

export const unlink = async () => {};

export const getAccessToken = async () => {
  return undefined;
};

export const getProfile = async () => {};

const app: KakaoSDK = {
  init,
  getAccessToken,
  getProfile,
  login,
  loginWithNewScopes,
  logout,
  unlink,
};

export default app;
