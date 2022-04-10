import { IAPIBaseProps, IAPIProps, IKakaoAPI, IKakaoDefault } from './types';
import { NativeModules } from 'react-native';

const { RNAKakaoSDK } = NativeModules;

export const init = async (appKey: string) => {
  RNAKakaoSDK.init(appKey);
};

export const isInitialized = async () => {
  return await RNAKakaoSDK.isInitialized();
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
