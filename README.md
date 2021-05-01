# KakaoSDK for React, React-Native

![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS%20%7C%20Web-brightgreen.svg?style=flat-square&colorB=191A17)
[![npm](https://img.shields.io/npm/v/@actbase/react-kakaosdk.svg?style=flat-square)](https://www.npmjs.com/package/@actbase/react-kakaosdk)
[![npm](https://img.shields.io/npm/dm/@actbase/react-kakaosdk.svg?style=flat-square&colorB=007ec6)](https://www.npmjs.com/package/@actbase/react-kakaosdk)
[![github issues](https://img.shields.io/github/issues/actbase/react-kakaosdk.svg?style=flat-square)](https://github.com/actbase/react-kakaosdk/issues)
[![github closed issues](https://img.shields.io/github/issues-closed/actbase/react-kakaosdk.svg?style=flat-square&colorB=44cc11)](https://github.com/actbase/react-kakaosdk/issues?q=is%3Aissue+is%3Aclosed)
[![Issue Stats](https://img.shields.io/issuestats/i/github/actbase/react-kakaosdk.svg?style=flat-square&colorB=44cc11)](http://github.com/actbase/react-kakaosdk/issues)

## Use Dependencies

| iOS                                                                   | Android                                                                   | Web                                                                    |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [2.5.0](https://developers.kakao.com/docs/latest/ko/sdk-download/ios) | [2.5.0](https://developers.kakao.com/docs/latest/ko/sdk-download/android) | [1.39.14](https://developers.kakao.com/docs/latest/ko/sdk-download/js) |

## 사용 환경

- CRA (create-react-app)
- Next.js
- React-Native 0.61 이상
- React-Native-Web

## 시작하기

```bash
$ npx @actbase/react-kakaosdk
```

웹이나 앱을 구분 한 뒤 알아서 wizard가 실행됩니다.

## 사용방법

```js
import KakaoSDK from '@actbase/react-kakaosdk';

// 카카오 로그인 시 처리부문
const tokens = await KakaoSDK.login();
```

| 변수명                | 설명                             |
| --------------------- | --------------------------- |
| access_token          | 카카오의 access_token           |
| refresh_token         | 카카오의 refresh_token          |
| expires_in            | 카카오의 accessToken 만료 남은 초  |
| refresh_token_expires_in | 카카오의 refreshToken 만료 남은 초 |
| scopes                | 사용권한                        |

```js
import KakaoSDK from '@actbase/react-kakaosdk';

// 카카오 로그아웃시 처리
await KakaoSDK.logout();

// 카카오 액세스 토큰 가져오는 명령, 로그인 시 자동으로 로그아웃 후 처리됨에 따라
// 별도로 값만 가져올 경우 사용.
// 로직 변경으로 인해 해당 현재 토큰의 대한 정보(아이디, 만료일)만 가져옵니다.
const accessToken = await KakaoSDK.getAccessToken();

// 카카오 회원정보 가져오기
const profile = await KakaoSDK.getProfile();
```

# Contacts

해당 모듈은 액트베이스(유)에서 개발 및 관리를 진행하고 있습니다. <br>
프로젝트 문의 혹은 제휴가 필요한 경우 project@actbase.io로 연락주세요.

# Changes

- 0.7.0
  - 첫 배포
