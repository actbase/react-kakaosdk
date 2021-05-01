import { KakaoSDK, ProfileType } from './types';

const getKakaoSDK = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') reject({ message: 'unsupported platform' });
    // @ts-ignore
    const kakaoSDK = global.Kakao;
    if (kakaoSDK) {
      resolve(kakaoSDK);
      return;
    }

    const jsapi = document.createElement('script');
    jsapi.type = 'text/javascript';
    jsapi.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    const s = document.getElementsByTagName('script')[0];
    s?.parentNode?.insertBefore(jsapi, s);
    // @ts-ignore
    jsapi.onload = () => resolve(global.Kakao);
    jsapi.onabort = jsapi.onerror = reject;
  });
};

export const init = async (appKey: string) => {
  const kakao = await getKakaoSDK();
  if (!kakao.isInitialized()) kakao.init(appKey);
};

export const isInitialized = async () => {
  const Kakao = await getKakaoSDK();
  return Kakao.isInitialized();
};

export const login = async () => {
  const Kakao = await getKakaoSDK();
  const exec = () => new Promise((success, fail) => Kakao.Auth.login({ scope: '', success, fail }));
  const output: any = (await exec()) || {};
  return {
    access_token: output?.access_token,
    expires_in: output?.expires_in,
    refresh_token: output?.refresh_token,
    refresh_token_expires_in: output?.refresh_token_expires_in,
    scopes: output?.scope.split(' '),
    token_type: output.token_type,
  };
};

export const loginWithNewScopes = async (scopes: string[]) => {
  const Kakao = await getKakaoSDK();
  const scope = scopes?.join(',');
  const exec = () => new Promise((success, fail) => Kakao.Auth.login({ scope, success, fail }));
  const output: any = (await exec()) || {};
  return {
    access_token: output?.access_token,
    expires_in: output?.expires_in,
    refresh_token: output?.refresh_token,
    refresh_token_expires_in: output?.refresh_token_expires_in,
    scopes: output?.scope.split(' '),
    token_type: output.token_type,
  };
};

export const logout = async () => {
  const Kakao = await getKakaoSDK();
  if (!Kakao.Auth.getAccessToken()) throw { message: 'Not logged in.' };

  const exec = () => new Promise(success => Kakao.Auth.logout(success));
  await exec();
};

export const unlink = async () => {
  const Kakao = await getKakaoSDK();
  const url = '/v1/user/unlink';
  const exec = () => new Promise((success, fail) => Kakao.API.request({ url, success, fail }));
  await exec();
};

export const getAccessToken = async () => {
  const Kakao = await getKakaoSDK();
  const output: any = Kakao.Auth.getAccessToken();
  return {
    access_token: output?.access_token,
    expires_in: output?.expires_in,
    refresh_token: output?.refresh_token,
    refresh_token_expires_in: output?.refresh_token_expires_in,
    scopes: output?.scope.split(' '),
    token_type: output.token_type,
  };
};

export const getProfile = async (): Promise<ProfileType> => {
  const Kakao = await getKakaoSDK();
  const url = '/v2/user/me';
  const exec = () => new Promise((success, fail) => Kakao.API.request({ url, success, fail }));
  return <ProfileType>await exec();
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
