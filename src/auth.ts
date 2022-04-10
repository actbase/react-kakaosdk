import { IAuthAuthorizeProps, IAuthLoginBaseProps, IAuthLoginProps, IKakaoAuth } from './types';

const authorize = async (props: IAuthAuthorizeProps) => {
  const { redirectUri, state, scope, nonce, throughTalk } = props;
  console.log(redirectUri, state, scope, nonce, throughTalk);
};

const setAccessToken = (accessToken: string) => {
  console.log(accessToken);
};

const getAccessToken = () => {
  return '';
};

const loginAsync = async (props: IAuthLoginBaseProps) => {
  const { scope } = props;
  console.log(scope);
};

const login = (props: IAuthLoginProps) => {
  const { scope, success, fail } = props;
  loginAsync({ scope })
    .then(response => success?.(response))
    .catch(error => fail?.(error));
};

const logoutAsync = async () => {};
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
