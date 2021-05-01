import { AccessTokenType, KakaoSDK } from './types';

const getKakaoSDK = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') reject({ message: 'unsupported platform' });
    // @ts-ignore
    if (typeof window['Kakao'] !== 'undefined') resolve(window['Kakao']);
    var jsapi = document.createElement('script');
    jsapi.type = 'text/javascript';
    jsapi.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    var s = document.getElementsByTagName('script')[0];
    s?.parentNode?.insertBefore(jsapi, s);
    jsapi.onload = () => {
      // @ts-ignore
      resolve(window['Kakao']);
    };
    jsapi.onerror = reject;
    jsapi.onabort = reject;
  });
};

const getToken = (Kakao: any): AccessTokenType => {
  const output = Kakao.Auth.getAccessToken();
  return {
    access_token: output.access_token,
    refresh_token: output.refresh_token,
    access_token_expiresAt: output.access_token_expiresAt,
    refresh_token_expiresAt: output.refresh_token_expiresAt,
    scopes: output.scopes,
  };
};

export const init = async (appKey: string) => {
  const Kakao = await getKakaoSDK();
  Kakao.init(appKey);
};

export const login = async () => {
  const Kakao = await getKakaoSDK();
  const scope = 'account_email,gender';
  const exec = () => new Promise((success, fail) => Kakao.Auth.login({ scope, success, fail }));
  console.log(await exec());
  return getToken(Kakao);
};

export const loginWithNewScopes = async (scopes: string[]) => {
  const Kakao = await getKakaoSDK();
  const scope = scopes?.join(',');
  const exec = () => new Promise((success, fail) => Kakao.Auth.login({ scope, success, fail }));
  console.log(await exec());
  return getToken(Kakao);
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
  return getToken(Kakao);
};

export const getProfile = async () => {
  const Kakao = await getKakaoSDK();
  const url = '/v2/user/me';
  const exec = () => new Promise((success, fail) => Kakao.API.request({ url, success, fail }));
  console.log(await exec());
  return {};
};

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
