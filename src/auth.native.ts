import { IAuthAuthorizeProps, IAuthLoginBaseProps, IAuthLoginProps, IKakaoAuth } from './types';
import { NativeModules } from 'react-native';

const { RNAKakaoSDK } = NativeModules;

const authorize = async (props: IAuthAuthorizeProps) => {
  // TODO Auth authorize
  const { redirectUri, state, scope, nonce, throughTalk } = props;
  console.log(redirectUri, state, scope, nonce, throughTalk);
};

const setAccessToken = (accessToken: string) => {
  // TODO Auth setAccessToken
  console.log(accessToken);
};

const getAccessToken = () => {
  // TODO Auth getAccessToken
  return '';
};

const loginAsync = async (props: IAuthLoginBaseProps) => {
  // TODO Auth loginAsync
  const { scope } = props;
  console.log(scope);
};

const login = (props: IAuthLoginProps) => {
  const { scope, success, fail } = props;
  loginAsync({ scope })
    .then(response => success?.(response))
    .catch(error => fail?.(error));
};

const logoutAsync = async () => {
  // TODO Auth logoutAsync
};

const logout = (handler: () => void) => {
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
