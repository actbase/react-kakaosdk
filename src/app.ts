import { IAPIBaseProps, IAPIProps, IKakaoAPI, IKakaoDefault } from './types';

const getKakaoSDK = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') reject({ message: 'unsupported platform' });
    const kakaoSDK = window.Kakao;
    if (kakaoSDK) {
      resolve(kakaoSDK);
      return;
    }

    const jsapi = document.createElement('script');
    jsapi.type = 'text/javascript';
    jsapi.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    const s = document.getElementsByTagName('script')[0];
    s?.parentNode?.insertBefore(jsapi, s);
    jsapi.onload = () => resolve(window.Kakao);
    jsapi.onabort = jsapi.onerror = reject;
  });
};

const init = async (appKey: string) => {
  const kakao = await getKakaoSDK();
  if (!kakao.isInitialized()) kakao.init(appKey);
};

export const isInitialized = async () => {
  const Kakao = await getKakaoSDK();
  return Kakao.isInitialized();
};

const requestAsync = async (props: IAPIBaseProps) => {};

const request = (props: IAPIProps) => {
  requestAsync({ url: props.url, data: props.data })
    .then(e => {
      props.success?.(e);
      return e;
    })
    .catch(e => {
      props.fail?.(e);
      return e;
    })
    .then(e => {
      props.always?.(e);
    });
};

const app: IKakaoDefault = {
  init,
  isInitialized,
  API: {
    request,
    requestAsync,
  },
};

export default app;
