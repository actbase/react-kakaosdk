#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface WithKakaoSDK : NSObject

+ (void)initSDK:(NSString *)appKey;
+ (BOOL)isKakaoTalkLoginUrl:(NSURL *)url;
+ (BOOL)handleOpenUrl:(NSURL *)url;

@end

NS_ASSUME_NONNULL_END

