package io.actbase.kakaosdk;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.net.Uri;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.kakao.sdk.common.KakaoSdk;
import com.kakao.sdk.common.model.AuthError;
import com.kakao.sdk.common.util.KakaoCustomTabsClient;
import com.kakao.sdk.talk.TalkApiClient;
import com.kakao.sdk.user.UserApiClient;
import com.kakao.sdk.user.model.Account;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class RNAKakaoSDK extends ReactContextBaseJavaModule {

  private ReactApplicationContext context;
  private boolean isInit = false;

  public RNAKakaoSDK(ReactApplicationContext context) {
    super(context);
    this.context = context;
  }

  public String getKeyHash() {
    String keyHash = null;
    PackageInfo packageInfo = null;
    try {
      packageInfo = context.getPackageManager()
          .getPackageInfo(context.getPackageName(), PackageManager.GET_SIGNATURES);
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }

    for (Signature signature : packageInfo.signatures) {
      try {
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        keyHash = Base64.encodeToString(md.digest(), Base64.DEFAULT);
      } catch (NoSuchAlgorithmException e) {
        Log.e("KeyHash", "Unable to get MessageDigest. signature=" + signature, e);
      }
    }

    return keyHash;
  }

  @Override
  public String getName() {
    return "RNAKakaoSDK";
  }

  private String format(Date date) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    return sdf.format(date);
  }

  private boolean toBool(Boolean b) {
    return b == null ? false : b;
  }

  private void loginWithKakaoAccount(Promise promise) {
    // change class into user api at kakao sdk 2.4
    UserApiClient.getInstance().loginWithKakaoAccount(context, (token, error) -> {
      try {
        if (error != null) {
          throw error;
        }
        WritableMap map = Arguments.createMap();
        map.putString("accessToken", token.getAccessToken());
        map.putString("refreshToken", token.getRefreshToken());
        map.putString("accessTokenExpiresAt", format(token.getAccessTokenExpiresAt()));
        map.putString("refreshTokenExpiresAt", format(token.getRefreshTokenExpiresAt()));

        WritableArray scopes = Arguments.createArray();
        if (token.getScopes() != null) {
          for (String scope : token.getScopes()) {
            scopes.pushString(scope);
          }
        }
        map.putArray("scopes", scopes);

        promise.resolve(map);
      } catch (Throwable ex) {
        if (ex instanceof AuthError) {
          AuthError authError = (AuthError) ex;
          if (authError.getStatusCode() == 401) {
            // invalid android_key_hash or ios_bundle_id or web_site_url.
            try {
              ClipboardManager clipboard = (ClipboardManager) context
                  .getSystemService(Context.CLIPBOARD_SERVICE);
              ClipData clip = ClipData.newPlainText("Android Key Hash", getKeyHash());
              clipboard.setPrimaryClip(clip);
              Toast.makeText(context, "Copy to Keyhash (clipboard)", Toast.LENGTH_SHORT).show();
            } catch (Exception ex2) {
              ex2.printStackTrace();
            }
          }
          promise.reject(String.valueOf(authError.getStatusCode()), authError.getLocalizedMessage(),
              ex);
        } else {
          ex.printStackTrace();
          promise.reject(ex);
        }
      }
      return null;
    });
  }

  @ReactMethod
  public void init(String appKey) {
    KakaoSdk.init(context, appKey);
    isInit = true;
  }

  @ReactMethod
  public void isInitialized(final Promise promise) {
    promise.resolve(isInit);
  }

  @ReactMethod
  public void login(final Promise promise) {
    if (!UserApiClient.getInstance().isKakaoTalkLoginAvailable(context)) {
      loginWithKakaoAccount(promise);
      return;
    }

    UserApiClient.getInstance().loginWithKakaoTalk(context.getCurrentActivity(), (token, error) -> {
      try {
        if (error != null) {
          throw error;
        }

        WritableMap map = Arguments.createMap();
        map.putString("accessToken", token.getAccessToken());
        map.putString("refreshToken", token.getRefreshToken());
        map.putString("accessTokenExpiresAt", format(token.getAccessTokenExpiresAt()));
        map.putString("refreshTokenExpiresAt", format(token.getRefreshTokenExpiresAt()));

        WritableArray scopes = Arguments.createArray();

        List<String> givenScopes = token.getScopes();

        if (givenScopes != null) {
          for (String scope : givenScopes) {
            scopes.pushString(scope);
          }
        }

        map.putArray("scopes", scopes);

        promise.resolve(map);
      } catch (Throwable ex) {
        if (ex instanceof AuthError) {
          AuthError authError = (AuthError) ex;
          if (authError.getStatusCode() == 302) {
            // KakaoTalk is installed but not connected to Kakao account.
            loginWithKakaoAccount(promise);
          } else {
            promise
                .reject(String.valueOf(authError.getStatusCode()), authError.getLocalizedMessage(),
                    ex);
          }
        } else {
          ex.printStackTrace();
          promise.reject(ex);
        }
      }
      return null;
    });
  }

  @ReactMethod
  public void loginWithNewScopes(ReadableArray permissions, final Promise promise) {
    List<String> perms = new ArrayList<String>();
    for (int i = 0; i < permissions.size(); i++) {
      perms.add(permissions.getString(i));
    }
    // change class into user api at kakao sdk 2.4
    UserApiClient.getInstance().loginWithNewScopes(context, perms, (token, error) -> {
      try {
        if (error != null) {
          throw new Exception(error.getMessage());
        }
        WritableMap map = Arguments.createMap();
        map.putString("accessToken", token.getAccessToken());
        map.putString("refreshToken", token.getRefreshToken());
        map.putString("accessTokenExpiresAt", format(token.getAccessTokenExpiresAt()));
        map.putString("refreshTokenExpiresAt", format(token.getRefreshTokenExpiresAt()));

        WritableArray scopes = Arguments.createArray();

        List<String> givenScopes = token.getScopes();

        if (givenScopes != null) {
          for (String scope : givenScopes) {
            scopes.pushString(scope);
          }
        }

        map.putArray("scopes", scopes);

        promise.resolve(map);
      } catch (Throwable ex) {
        promise.reject(ex);
      }
      return null;
    });
  }

  @ReactMethod
  public void logout(final Promise promise) {
    UserApiClient.getInstance().logout((error) -> {
      if (error != null) {
        promise.reject(error);
      } else {
        promise.resolve("SUCCESS");
      }
      return null;
    });
  }

  @ReactMethod
  public void unlink(final Promise promise) {
    UserApiClient.getInstance().unlink((error) -> {
      if (error != null) {
        promise.reject(error);
      } else {
        promise.resolve("SUCCESS");
      }
      return null;
    });
  }

  @ReactMethod
  public void getAccessToken(final Promise promise) {
    UserApiClient.getInstance().accessTokenInfo((tokenInfo, error) -> {
      try {
        if (error != null) {
          throw new Exception(error.getMessage());
        }

        WritableMap map = Arguments.createMap();
        map.putDouble("id", tokenInfo.getId());
        map.putDouble("expiresIn", tokenInfo.getExpiresIn());
        promise.resolve(map);

      } catch (Throwable ex) {
        promise.reject(ex);
      }
      return null;
    });
  }

  @ReactMethod
  public void getProfile(final Promise promise) {
    UserApiClient.getInstance().me((user, error) -> {
      try {
        if (error != null) {
          error.printStackTrace();
          throw new Exception(error.getMessage());
        }

        WritableMap map = Arguments.createMap();
        map.putDouble("id", user.getId());
        map.putString("connectedAt", format(user.getConnectedAt()));

        {
          WritableMap kakaoAccount = Arguments.createMap();
          Account origin = user.getKakaoAccount();
          if (origin != null) {
            if (origin.getEmailNeedsAgreement() != null) {
              if (origin.getEmailNeedsAgreement() == Boolean.FALSE) {
                kakaoAccount.putString("email", origin.getEmail());
              }
              kakaoAccount.putBoolean("emailNeedsAgreement", toBool(origin.getEmailNeedsAgreement()));
              kakaoAccount.putBoolean("isEmailValid", toBool(origin.isEmailValid()));
              kakaoAccount.putBoolean("isEmailVerified", toBool(origin.isEmailVerified()));
            }

            if (origin.getBirthdayNeedsAgreement() != null) {
              if (origin.getBirthdayNeedsAgreement() == Boolean.FALSE) {
                kakaoAccount.putString("birthday", origin.getBirthday());
              }
              kakaoAccount
                  .putBoolean("birthdayNeedsAgreement", toBool(origin.getBirthdayNeedsAgreement()));
            }

            if (origin.getBirthyearNeedsAgreement() != null) {
              if (origin.getBirthyearNeedsAgreement() == Boolean.FALSE) {
                kakaoAccount.putString("birthyear", origin.getBirthyear());
              }
              kakaoAccount
                  .putBoolean("birthyearNeedsAgreement", toBool(origin.getBirthyearNeedsAgreement()));
            }

            if (origin.getGenderNeedsAgreement() != null) {
              if (origin.getGenderNeedsAgreement() == Boolean.FALSE && origin.getGender() != null) {
                kakaoAccount.putString("gender", origin.getGender().toString());
              }
              kakaoAccount
                  .putBoolean("genderNeedsAgreement", toBool(origin.getGenderNeedsAgreement()));
            }

            if (origin.getCiNeedsAgreement() != null) {
              if (origin.getCiNeedsAgreement() == Boolean.FALSE && origin.getCi() != null) {
                kakaoAccount.putString("ci", origin.getCi().toString());
              }
              kakaoAccount.putString("ciAuthenticatedAt", format(origin.getCiAuthenticatedAt()));
              kakaoAccount.putBoolean("ciNeedsAgreement", toBool(origin.getCiNeedsAgreement()));
            }

            if (origin.getLegalBirthDateNeedsAgreement() != null) {
              if (origin.getLegalBirthDateNeedsAgreement() == Boolean.FALSE) {
                kakaoAccount.putString("legalBirthDate", origin.getLegalBirthDate());
              }
              kakaoAccount.putBoolean("legalBirthDateNeedsAgreement",
                  toBool(origin.getLegalBirthDateNeedsAgreement()));
            }

            if (origin.getLegalGenderNeedsAgreement() != null) {
              if (origin.getLegalGenderNeedsAgreement() == Boolean.FALSE
                  && origin.getLegalGender() != null) {
                kakaoAccount.putString("legalGender", origin.getLegalGender().toString());
              }
              kakaoAccount
                  .putBoolean("legalGenderNeedsAgreement",
                      toBool(origin.getLegalGenderNeedsAgreement()));
            }

            if (origin.getLegalNameNeedsAgreement() != null) {
              if (origin.getLegalNameNeedsAgreement() == Boolean.FALSE) {
                kakaoAccount.putString("legalName", origin.getLegalName());
              }
              kakaoAccount
                  .putBoolean("legalNameNeedsAgreement", toBool(origin.getLegalNameNeedsAgreement()));
            }

            if (origin.getAgeRangeNeedsAgreement() != null) {
              if (origin.getAgeRangeNeedsAgreement() == Boolean.FALSE
                  && origin.getAgeRange() != null) {
                kakaoAccount.putString("ageRange", origin.getAgeRange().toString());
              }
              kakaoAccount
                  .putBoolean("ageRangeNeedsAgreement", toBool(origin.getAgeRangeNeedsAgreement()));
            }

            if (origin.getPhoneNumberNeedsAgreement() != null) {
              if (origin.getPhoneNumberNeedsAgreement() == Boolean.FALSE) {
                kakaoAccount.putString("phoneNumber", origin.getPhoneNumber());
              }
              kakaoAccount
                  .putBoolean("phoneNumberNeedsAgreement",
                      toBool(origin.getPhoneNumberNeedsAgreement()));
            }

            if (origin.getProfileNeedsAgreement() != null) {
              if (origin.getProfileNeedsAgreement() == Boolean.FALSE) {
                WritableMap profile = Arguments.createMap();
                profile.putString("nickname", origin.getProfile().getNickname());
                profile.putString("profileImageUrl", origin.getProfile().getProfileImageUrl());
                profile.putString("thumbnailImageUrl", origin.getProfile().getThumbnailImageUrl());
                kakaoAccount.putMap("profile", profile);
              }
              kakaoAccount
                  .putBoolean("profileNeedsAgreement", toBool(origin.getProfileNeedsAgreement()));
            }
          }
          map.putMap("kakaoAccount", kakaoAccount);
        }

        {
          WritableMap properties = Arguments.createMap();
          Map<String, String> origin = user.getProperties();
          if (origin != null) {
            for (String key : origin.keySet()) {
              if (origin.get(key) != null) {
                properties.putString(key, origin.get(key));
              }
            }
          }
          map.putMap("properties", properties);
        }
        promise.resolve(map);

      } catch (Throwable ex) {
        promise.reject(ex);
      }
      return null;
    });
  }

  @ReactMethod
  public void openChannel(String url, final Promise promise) {
    Uri talkUrl = TalkApiClient.getInstance().addChannelUrl(url);
    KakaoCustomTabsClient.INSTANCE.openWithDefault(getReactApplicationContext().getCurrentActivity(), talkUrl);
    promise.resolve(true);
  }

  @ReactMethod
  public void openChannelChat(String url, final Promise promise) {
    Uri talkUrl = TalkApiClient.getInstance().channelChatUrl(url);
    KakaoCustomTabsClient.INSTANCE.openWithDefault(getReactApplicationContext().getCurrentActivity(), talkUrl);
    promise.resolve(true);
  }

  public String getKeyHash(final Context context) {
    PackageInfo packageInfo = null;
    try {
      packageInfo = context.getPackageManager()
          .getPackageInfo(context.getPackageName(), PackageManager.GET_SIGNATURES);
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }

    if (packageInfo == null) {
      return null;
    }
    for (Signature signature : packageInfo.signatures) {
      try {
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        return Base64.encodeToString(md.digest(), Base64.NO_WRAP);
      } catch (NoSuchAlgorithmException e) {
        e.printStackTrace();
      }
    }
    return null;
  }

}

