export interface ProfileType {
  id: number;
  connected_at: string;
  kakao_account: {
    profile_needs_agreement?: boolean;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };

    emailNeedsAgreement?: boolean;
    email?: string;
    isEmailValid?: boolean;
    isEmailVerified?: boolean;

    birthdayNeedsAgreement?: boolean;
    birthday?: string;

    birthyearNeedsAgreement?: boolean;
    birthyear?: string;

    genderNeedsAgreement?: boolean;
    gender?: 'male' | 'female' | null;

    ciNeedsAgreement?: boolean;
    ci?: string;
    ciAuthenticatedAt?: string;

    legalBirthDateNeedsAgreement?: boolean;
    legalBirthDate?: string;

    legalGenderNeedsAgreement?: boolean;
    legalGender?: 'male' | 'female' | null;

    legalNameNeedsAgreement?: boolean;
    legalName?: string;

    ageRangeNeedsAgreement?: boolean;
    ageRange?:
      | '0~9'
      | '10~14'
      | '15~19'
      | '20~29'
      | '30~39'
      | '40~49'
      | '50~59'
      | '60~69'
      | '70~79'
      | '80~89'
      | '90~'
      | null;

    phoneNumberNeedsAgreement?: boolean;
    phoneNumber?: string;
  };
  properties: any;
}

export interface AccessTokenType {
  access_token: string;
  refresh_token: string;
  access_token_expiresAt: string;
  refresh_token_expiresAt: string;
  scopes: string[];
}

export interface KakaoSDK {
  init: (appKey: string) => Promise<void>;
  getAccessToken: () => Promise<AccessTokenType | undefined>;
  getProfile: () => Promise<any>;
  login: () => Promise<AccessTokenType | undefined>;
  loginWithNewScopes: (scopes: string[]) => Promise<AccessTokenType | undefined>;
  logout: () => Promise<void>;
  unlink: () => Promise<void>;
}
