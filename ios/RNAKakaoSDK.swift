//
//  RNAKakaoSDK.swift
//  RNAKakaoSDK
//
//  Created by Suhan Moon on 2020/08/27.
//

import Foundation
import KakaoSDKCommon
import KakaoSDKAuth
import KakaoSDKUser

@objc(RNAKakaoSDK)
public class RNAKakaoSDK: NSObject {

    fileprivate var inited = false;

    @objc
    static func requiresMainQueueSetup() -> Bool {
      return true
    }

    @objc(isKakaoTalkLoginUrl:)
    public static func isKakaoTalkLoginUrl(url:URL) -> Bool {
        return AuthApi.isKakaoTalkLoginUrl(url)
    }

    @objc(handleOpenUrl:)
    public static func handleOpenUrl(url:URL) -> Bool {
        return AuthController.handleOpenUrl(url: url)
    }

    func objectToDic<T>(_ value: T) throws -> Any where T: Encodable {
        let json = try JSONEncoder().encode(value)
        let dict = try JSONSerialization.jsonObject(with: json, options: .allowFragments);
        return dict;
    }

    @objc(init:)
    func sdkinit(_ appKey: String) -> Void {
        KakaoSDKCommon.initSDK(appKey: appKey)
        inited = true
    }

    @objc(isInitialized:rejecter:)
    func isInitialized(_ resolve: @escaping RCTPromiseResolveBlock,
                       rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        resolve(inited);
    }

    @objc(login:rejecter:)
    func login(_ resolve: @escaping RCTPromiseResolveBlock,
               rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {

        DispatchQueue.main.async {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";

            if (UserApi.isKakaoTalkLoginAvailable()) {
                UserApi.shared.loginWithKakaoTalk {(oauthToken, error) in
                    do {
                        if let error = error {
                            throw error;
                        }
                        resolve([
                            "accessToken": oauthToken?.accessToken,
                            "refreshToken": oauthToken?.refreshToken,
                            "accessTokenExpiresAt": dateFormatter.string(from: oauthToken!.expiredAt),
                            "refreshTokenExpiresAt": dateFormatter.string(from: oauthToken!.refreshTokenExpiredAt),
                            "scopes": oauthToken?.scopes,
                        ])
                    } catch let e {
                        print(e);
                        reject("actbase_kakao_sdk", e.localizedDescription, nil)
                    }
                }
            }
            else {
                UserApi.shared.loginWithKakaoAccount {(oauthToken, error) in
                    do {
                        if let error = error {
                            throw error;
                        }

                        resolve([
                            "accessToken": oauthToken?.accessToken,
                            "refreshToken": oauthToken?.refreshToken,
                            "accessTokenExpiresAt": dateFormatter.string(from: oauthToken!.expiredAt),
                            "refreshTokenExpiresAt": dateFormatter.string(from: oauthToken!.refreshTokenExpiredAt),
                            "scopes": oauthToken?.scopes,
                        ])
                    } catch let e {
                        print(e);
                        reject("actbase_kakao_sdk", e.localizedDescription, nil)
                    }
                }
            }
        }
    }

    @objc(loginWithNewScopes:resolver:rejecter:)
    func loginWithNewScopes(_ scopedata: NSArray,
               resolver resolve: @escaping RCTPromiseResolveBlock,
               rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        DispatchQueue.main.async {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";

            var scopes = scopedata as? [String]
            UserApi.shared.loginWithKakaoAccount(scopes: scopes!) { (oauthToken, error) in
                if let error = error {
                    reject("RCTKakaoSDK", error.asAFError?.errorDescription, nil)
                    return
                }
                else {
                    do {
                        if let error = error {
                            throw error;
                        }

                        resolve([
                            "accessToken": oauthToken?.accessToken,
                            "refreshToken": oauthToken?.refreshToken,
                            "accessTokenExpiresAt": dateFormatter.string(from: oauthToken!.expiredAt),
                            "refreshTokenExpiresAt": dateFormatter.string(from: oauthToken!.refreshTokenExpiredAt),
                            "scopes": oauthToken?.scopes,
                        ])

                    } catch let e {
                        reject("actbase_kakao_sdk", e.localizedDescription, nil)
                    }
                }
            }
        }
    }

    @objc(logout:rejecter:)
    func logout(_ resolve: @escaping RCTPromiseResolveBlock,
               rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {

        DispatchQueue.main.async {
            UserApi.shared.logout {(error) in
                do {
                    if let error = error {
                        throw error;
                    }
                    resolve("SUCCESS")
                } catch let e {
                    reject("actbase_kakao_sdk", e.localizedDescription, nil)
                }
            }
        }
    }

    @objc(unlink:rejecter:)
    func unlink(_ resolve: @escaping RCTPromiseResolveBlock,
               rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {

        DispatchQueue.main.async {
            UserApi.shared.unlink {(error) in
                do {
                    if let error = error {
                        throw error;
                    }
                    resolve("SUCCESS")
                } catch let e {
                    reject("actbase_kakao_sdk", e.localizedDescription, nil)
                }
            }
        }
    }

    @objc(getAccessToken:rejecter:)
    func getAccessToken(_ resolve: @escaping RCTPromiseResolveBlock,
               rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {

        DispatchQueue.main.async {
            UserApi.shared.accessTokenInfo {(accessTokenInfo, error) in
                do {
                    if let error = error {
                        throw error;
                    }
                    resolve([
                        "id": accessTokenInfo?.id,
                        "expiresIn": accessTokenInfo?.expiresIn
                    ])
                } catch let e {
                    reject("actbase_kakao_sdk", e.localizedDescription, nil)
                }
            }
        }
    }

    @objc(getProfile:rejecter:)
    func getProfile(_ resolve: @escaping RCTPromiseResolveBlock,
               rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {

        DispatchQueue.main.async {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";
            UserApi.shared.me() {(user, error) in
                do {
                    if let error = error {
                        throw error;
                    }

                    var map: [String: Any] = [
                        "id": user?.id,
                        "connectedAt": dateFormatter.string(from: user!.connectedAt!)
                    ];

                    var kakaoAccount: [String: Any] = [:]
                    var origin: Account = user!.kakaoAccount!

                    if (origin.emailNeedsAgreement != nil) {
                        if (origin.emailNeedsAgreement == false) {
                            kakaoAccount.updateValue(origin.email, forKey: "email")
                        }
                        kakaoAccount.updateValue(origin.emailNeedsAgreement, forKey: "emailNeedsAgreement")
                        kakaoAccount.updateValue(origin.isEmailValid, forKey: "isEmailValid")
                        kakaoAccount.updateValue(origin.isEmailVerified, forKey: "isEmailVerified")
                    }

                    if (origin.birthdayNeedsAgreement != nil) {
                        if (origin.birthdayNeedsAgreement == false) {
                            kakaoAccount.updateValue(origin.birthday, forKey: "birthday")
                        }
                        kakaoAccount.updateValue(origin.birthdayNeedsAgreement, forKey: "birthdayNeedsAgreement")
                    }

                    if (origin.birthyearNeedsAgreement != nil) {
                        if (origin.birthyearNeedsAgreement == false) {
                            kakaoAccount.updateValue(origin.birthyear, forKey: "birthyear")
                        }
                        kakaoAccount.updateValue(origin.birthyearNeedsAgreement, forKey: "birthyearNeedsAgreement")
                    }

                    if (origin.genderNeedsAgreement != nil) {
                        if (origin.genderNeedsAgreement == false) {
                            kakaoAccount.updateValue(origin.gender?.rawValue, forKey: "gender")
                        }
                        kakaoAccount.updateValue(origin.genderNeedsAgreement, forKey: "genderNeedsAgreement")
                    }

                    if (origin.ciNeedsAgreement != nil) {
                        if (origin.ciNeedsAgreement == false) {
                            kakaoAccount.updateValue(origin.ci, forKey: "ci")
                        }
                        kakaoAccount.updateValue(dateFormatter.string(from: origin.ciAuthenticatedAt!), forKey: "ciAuthenticatedAt")
                        kakaoAccount.updateValue(origin.ciNeedsAgreement, forKey: "ciNeedsAgreement")
                    }

                    if (origin.legalBirthDateNeedsAgreement != nil) {
                        if (origin.legalBirthDateNeedsAgreement == false) {
                            kakaoAccount.updateValue(origin.legalBirthDate, forKey: "legalBirthDate")
                        }
                        kakaoAccount.updateValue(origin.legalBirthDateNeedsAgreement, forKey: "legalBirthDateNeedsAgreement")
                    }

                    if (origin.legalGenderNeedsAgreement != nil) {
                        if (origin.legalGenderNeedsAgreement == false) {
                            kakaoAccount.updateValue(origin.legalGender?.rawValue, forKey: "legalGender")
                        }
                        kakaoAccount.updateValue(origin.legalGenderNeedsAgreement, forKey: "legalGenderNeedsAgreement")
                    }

                    if (origin.legalNameNeedsAgreement != nil) {
                        if (origin.legalNameNeedsAgreement == false) {
                            kakaoAccount.updateValue(origin.legalName, forKey: "legalName")
                        }
                        kakaoAccount.updateValue(origin.legalNameNeedsAgreement, forKey: "legalNameNeedsAgreement")
                    }

                    if (origin.ageRangeNeedsAgreement != nil) {
                        if (origin.ageRangeNeedsAgreement == false) {
                            kakaoAccount.updateValue(origin.ageRange?.rawValue, forKey: "ageRange")
                        }
                        kakaoAccount.updateValue(origin.ageRangeNeedsAgreement, forKey: "ageRangeNeedsAgreement")
                    }

                    if (origin.phoneNumberNeedsAgreement != nil) {
                        if (origin.phoneNumberNeedsAgreement == false) {
                            kakaoAccount.updateValue(origin.phoneNumber, forKey: "phoneNumber")
                        }
                        kakaoAccount.updateValue(origin.phoneNumberNeedsAgreement, forKey: "phoneNumberNeedsAgreement")
                    }

                    if (origin.profileNeedsAgreement != nil) {
                        if (origin.profileNeedsAgreement == false) {
                            kakaoAccount.updateValue([
                                "nickname": origin.profile?.nickname,
                                "profileImageUrl": origin.profile?.profileImageUrl,
                                "thumbnailImageUrl": origin.profile?.thumbnailImageUrl,
                            ], forKey: "profile")
                        }
                        kakaoAccount.updateValue(origin.profileNeedsAgreement, forKey: "profileNeedsAgreement")
                    }
                    map.updateValue(kakaoAccount, forKey: "kakaoAccount")
                    map.updateValue(user?.properties, forKey: "properties");
                    resolve(map)
                } catch let e {
                    reject("actbase_kakao_sdk", e.localizedDescription, nil)
                }
            }
        }
    }


}
