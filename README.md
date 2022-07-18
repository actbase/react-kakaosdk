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
| [2.5.1](https://developers.kakao.com/docs/latest/ko/sdk-download/ios) | [2.5.0](https://developers.kakao.com/docs/latest/ko/sdk-download/android) | [1.39.14](https://developers.kakao.com/docs/latest/ko/sdk-download/js) |

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

### iOS

[공식문서 - 개발 프로젝트 설정](https://developers.kakao.com/docs/latest/ko/getting-started/sdk-ios-v1) 을 참고하여 `info.plist` 의 아래`NATIVE_APP_KEY` 문구를 잘 확인하시여 본인의 Kakao App Key로 변경해주세요.

```
+ <key>KAKAO_APP_KEY</key>
+ <string>{NATIVE_APP_KEY}</string>
```

AppDelegate.m (++ 된 부분 추가)

```
#import "WithKakaoSDK.h"

- (BOOL)application:(UIApplication *)app
openURL:(NSURL *)url
options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
...

++ NSString *appKey = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"KAKAO_APP_KEY"];
[WithKakaoSDK initSDK: appKey];
if ([WithKakaoSDK isKakaoTalkLoginUrl:url]) return [WithKakaoSDK handleOpenUrl:url];
[[FBSDKApplicationDelegate sharedInstance] application:app
openURL:url
options:options];

...

return NO;
}
```

다른 수정사항은 npx를 이용해 kakaosdk모듈을 설치 진행 하고 kakaoApiKey 입력을 하시면 자동으로 추가가됩니다.



### Android

## 사용방법

Project build.gradle 안에 다음과 같이 android sdk repository를 추가해주세요.

```
allprojects {
    repositories {

        maven { url 'https://devrepo.kakao.com/nexus/content/groups/public/' }
    }
}
```

```js
import KakaoSDK from '@actbase/react-kakaosdk';

// 카카오 로그인 시 처리부문
await KakaoSDK.init(NATIVE_APP_KEY);
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

// 카카오 회원정보 가져오기
const profile = await KakaoSDK.getProfile();
```

# Contacts

해당 모듈은 액트베이스(유)에서 개발 및 관리를 진행하고 있습니다. <br>
프로젝트 문의 혹은 제휴가 필요한 경우 project@actbase.io로 연락주세요.

# Changes
- 0.9.19
  - 카카오 iOS SDK 장애로 버전 fixed 처리
- 0.9.18
  - 액트베이스(유) 오픈소스 기준에 맞춰서 수정
- 0.9.17
  - 카카오 로그인 시 keyhash 없는경우 클립보드에 넣어주는 기능 장애 처리
- 0.9.16
  - 적폐 제거 (원인제공자는 살림)
- 0.9.14
  - 사용하지 않는 명령 제거
  - typing 업데이트
- 0.9.12
  - 웹버전 scope없을때 장애 처리
- 0.9.11
  - 안드로이드 간혈적 에러 처리
- 0.9.10
  - 카카오 웹 버전에서도 openChannel 사용가능.
  - openChannelChat으로 즉시 채팅 열수있음.
- 0.9.8
  - iOS Kakao Login 버그수정
- 0.9.7
  - 카카오 채널 기능 버그수정
- 0.9.6
  - 카카오 채널 기능 추가
- 0.9.4
  - 안드로이드 간혈적 kakaoAccount null 일 경우 처리
- 0.9.3
  - 첫 배포
