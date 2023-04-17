#import "WithKakaoSDK.h"
#import <RNAKakaoSDK/RNAKakaoSDK-Swift.h>

@implementation WithKakaoSDK

+ (BOOL)isKakaoTalkLoginUrl:(NSURL *)url {
    return [RNAKakaoSDK isKakaoTalkLoginUrl:url];
}

+ (BOOL)handleOpenUrl:(NSURL *)url {
    return [RNAKakaoSDK handleOpenUrl:url];

}


@end
