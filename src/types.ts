import {openChannelChat} from "./app";

export interface ProfileType {
  connected_at: string;
  id: number;
  kakao_account: {
    has_age_range?: boolean;
    age_range_needs_agreement?: boolean;
    age_range?:
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

    has_birthday?: boolean;
    birthday_needs_agreement?: boolean;
    birthday?: string;
    birthday_type?: string;

    has_birthyear?: boolean;
    birthyear_needs_agreement?: boolean;
    birthyear?: string;

    has_email?: boolean;
    email_needs_agreement?: boolean;
    email?: string;

    is_email_valid?: boolean;
    is_email_verified?: boolean;

    has_gender?: boolean;
    gender_needs_agreement?: boolean;
    gender?: 'male' | 'female' | null;

    profile_needs_agreement?: boolean;
    profile?: {
      is_default_image?: boolean;
      nickname?: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };

    ci_needs_agreement?: boolean;
    ci?: string;
    ci_authenticated_at?: string;

    legal_birth_date_needs_agreement?: boolean;
    legal_birth_date?: string;

    legal_gender_needs_agreement?: boolean;
    legal_gender?: 'male' | 'female' | null;

    legal_name_needs_agreement?: boolean;
    legal_name?: string;

    phone_number_needs_agreement?: boolean;
    phone_number?: string;
  };
  properties: {
    [key: string]: any;
  };
}

export interface AccessTokenType {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scopes: string[];
  token_type?: string;
}

export interface KakaoSDK {
  init: (appKey: string) => Promise<void>;
  isInitialized: () => Promise<boolean>;
  getAccessToken: () => Promise<AccessTokenType | undefined>;
  getProfile: () => Promise<ProfileType>;
  login: () => Promise<AccessTokenType | undefined>;
  loginWithNewScopes: (scopes: string[]) => Promise<AccessTokenType | undefined>;
  logout: () => Promise<void>;
  unlink: () => Promise<void>;
  openChannel: (id: string) => Promise<any>;
  openChannelChat: (id: string) => Promise<any>;
}
