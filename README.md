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

### 처음 설치 시 주의 사항 (React-Native 만)

해당 모듈은 Swift로 되어있어서 <br />
그냥 가동 시 작동이 안될 수 있습니다.

Xcode에서 프로젝트 내 비어있는 Swift File를 새로 만들고 Headers 생성을 누르면<br />
스위프트 모드로 잡히면서 정상적으로 돌게 됩니다.

이후 해결방안 나오면 별도로 공지하겠습니다.

### Xcode 12.5 업뎃 후 빌드 실패 해결법 (React-Native 만)

갑자기 Xcode 업데이트 후 디버그로는 빌드가 안되는 문제가 있습니다.<br />
원인은 Alamofire에서 나오는 부분인데 프로젝트 설정으로 해결할 수 있습니다.

해당 프로젝트 설정을 접근 후 Target에 프로젝트에서
Build Settings 접근 후 Library Search Path를 검색하면 그 안에 Debug쪽에 있는 부분을 수정해야합니다.

<img src="https://github.com/actbase/react-kakaosdk/raw/main/assets/xcode_0501.png" title="Xcode Settings" float="left">

\$(inherited)를 제외한 2개를 삭제 후 저장하고 빌드하면 정상적으로 돌아갑니다.

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

| 변수명                   | 설명                               |
| ------------------------ | ---------------------------------- |
| access_token             | 카카오의 access_token              |
| refresh_token            | 카카오의 refresh_token             |
| expires_in               | 카카오의 accessToken 만료 남은 초  |
| refresh_token_expires_in | 카카오의 refreshToken 만료 남은 초 |
| scopes                   | 사용권한                           |

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

- 0.9.4
  - 안드로이드 간혈적 kakaoAccount null 일 경우 처리
- 0.9.3
  - 첫 배포
