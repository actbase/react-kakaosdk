import { IAPIBaseProps, IAPIProps, IKakaoAPI, IKakaoDefault } from './types';
import { NativeModules } from 'react-native';

const { RNAKakaoSDK } = NativeModules;

export const init = async (appKey: string) => {
  await RNAKakaoSDK.init(appKey);
};

export const isInitialized = async () => {
  return await RNAKakaoSDK.isInitialized();
};

const requestAsync = async (props: IAPIBaseProps) => {
  // TODO API Request
  // /v2/user/me - 사용자 정보 가져오기
  // /v1/user/update_profile - 사용자 정보 저장하기
  // /v2/user/scopes - 동의 내역 확인하기
  // /v2/user/revoke/scopes - 동의 철회하기
  // /v1/api/talk/profile - 프로필 가져오기
  // /v1/api/talk/friends - 친구 목록 가져오기
  // /v2/api/talk/memo/default/send - 기본 템플릿으로 메시지 보내기
  // /v1/api/talk/friends/message/default/send - 친구에게 보내기
  // /v2/api/talk/memo/send - 사용자 정의 템플릿으로 메시지 보내기
  // /v1/api/talk/friends/message/send - 친구에게 보내기
  // /v2/api/talk/memo/scrap/send - 기본 템플릿으로 스크랩 메시지 보내기
  // /v1/api/talk/friends/message/scrap/send - 친구에게 보내기
  // /v2/api/talk/memo/scrap/send - 사용자 정의 템플릿으로 스크랩 메시지 보내기
  // /v1/api/talk/friends/message/scrap/send - 친구에게 보내기
  // /v1/api/story/isstoryuser - 사용자 확인하기
  // /v1/api/story/profile - 프로필 가져오기
  // /v1/api/story/post/note - 글 스토리 쓰기
  // /v1/api/story/upload/multi - 사진 스토리
  // /v1/api/story/linkinfo
  // /v1/api/story/mystory
  // /v1/api/story/mystories
  // /v1/api/story/delete/mystory
};

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
