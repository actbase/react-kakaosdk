import { IAuthAuthorizeProps, IAuthLoginBaseProps, IAuthLoginProps, IKakaoAuth } from './types';
import { reject } from 'lodash';

const authorize = async (props: IAuthAuthorizeProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Auth.authorize(props);
};

const setAccessToken = (accessToken: string) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Auth.setAccessToken(accessToken);
};

const getAccessToken = () => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  return window.Kakao.Auth.getAccessToken();
};

const loginAsync = (props: IAuthLoginBaseProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  return new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      ...props,
      success: (r: unknown) => resolve(r),
      fail: (e: unknown) => reject(e),
    });
  });
};

const login = (props: IAuthLoginProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  const { scope, success, fail } = props;
  loginAsync({ scope })
    .then(response => success?.(response))
    .catch(error => fail?.(error));
};

const logoutAsync = () => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  return new Promise<void>(resolve => {
    window.Kakao.Auth.logout(() => resolve());
  });
};

const logout = (handler: () => void) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  logoutAsync().then(() => handler());
};

const Auth: IKakaoAuth = {
  authorize,
  setAccessToken,
  getAccessToken,
  logout,
  logoutAsync,
  login,
  loginAsync,
};

export default Auth;
