import { NativeModules } from 'react-native';
import { KakaoSDK, ProfileType } from './types';

const { RNAKakaoSDK } = NativeModules;

const dateToSeconds = (str: string): number => {
  const v = new Date(str?.replace(' ', 'T')).getTime();
  const n = new Date().getTime();
  return Math.floor((v - n) / 1000);
};

const valueToSnakeCase = (data: { [key: string]: any }) => {
  const args: { [key: string]: any } = {};
  for (const key of Object.keys(data)) {
    const nkey: string = key.replace(/(?:^|\.?)([A-Z])/g, (_x, y) => '_' + y.toLowerCase()).replace(/^_/, '');
    if (data[key] && typeof data[key] === 'object' && !data[key]?.push && Object.keys(data[key])?.length > 0) {
      args[nkey] = valueToSnakeCase(data[key]);
    } else {
      args[nkey] = data[key];
    }
  }
  return args;
};

export const init = async (appKey: string) => {
  RNAKakaoSDK.init(appKey);
};

export const isInitialized = async () => {
  return await RNAKakaoSDK.isInitialized();
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

export const getProfile: () => Promise<ProfileType> = async () => {
  const result = await RNAKakaoSDK.getProfile();
  return <ProfileType>valueToSnakeCase(result);
};

export const openChannel: (id: string) => Promise<any> = async (id: string) =>{
  return await RNAKakaoSDK.openChannel(id);
}

export const openChannelChat: (id: string) => Promise<any> = async (id: string) =>{
  return await RNAKakaoSDK.openChannelChat(id);
}

const app: KakaoSDK = {
  init,
  isInitialized,
  getAccessToken,
  getProfile,
  login,
  loginWithNewScopes,
  logout,
  unlink,
  openChannel,
  openChannelChat,
};

export default app;
