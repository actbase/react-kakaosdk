#import <React/RCTBridgeModule.h>
#import "RNAKakaoSDKModule.h"

@interface RCT_EXTERN_MODULE(RNAKakaoSDK, NSObject)

RCT_EXTERN_METHOD(login:(RCTPromiseResolveBlock *)resolve rejecter:(RCTPromiseRejectBlock *)reject);
RCT_EXTERN_METHOD(logout:(RCTPromiseResolveBlock *)resolve rejecter:(RCTPromiseRejectBlock *)reject);
RCT_EXTERN_METHOD(unlink:(RCTPromiseResolveBlock *)resolve rejecter:(RCTPromiseRejectBlock *)reject);
RCT_EXTERN_METHOD(getAccessToken:(RCTPromiseResolveBlock *)resolve rejecter:(RCTPromiseRejectBlock *)reject);
RCT_EXTERN_METHOD(getProfile:(RCTPromiseResolveBlock *)resolve rejecter:(RCTPromiseRejectBlock *)reject);
RCT_EXTERN_METHOD(loginWithNewScopes:(NSArray *)scopes
                  resolver:(RCTPromiseResolveBlock *)resolve
                  rejecter:(RCTPromiseRejectBlock *)reject);

@end
