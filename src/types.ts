import * as React from 'react';

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

export interface AccessTokenInfo {
  id: number;
  expires_in: number;
}

export interface KakaoSDK {
  init: (appKey: string) => Promise<void>;
  isInitialized: () => Promise<boolean>;
  getAccessToken: () => Promise<AccessTokenInfo | undefined>;
  getProfile: () => Promise<ProfileType>;
  login: () => Promise<AccessTokenType | undefined>;
  manualLogin: () => Promise<AccessTokenType | undefined>;
  loginWithNewScopes: (scopes: string[]) => Promise<AccessTokenType | undefined>;
  logout: () => Promise<void>;
  unlink: () => Promise<void>;
  openChannel: (id: string) => Promise<any>;
  openChannelChat: (id: string) => Promise<any>;
}

export interface IAPIBaseProps {
  url: string;
  data?: {
    // Kakao Story
    id?: string;
    link_info?: {
      url?: string;
      requested_url?: string;
      host?: string;
      title?: string;
      image?: string[];
      description?: string;
      type?: string;
      section?: string;
    };
    image_url_list?: string[];
    content?: string;
    permission?: string;
    enable_share?: boolean;
    android_exec_param?: string;
    ios_exec_param?: string;
    android_market_param?: string;
    ios_market_param?: string;

    // Kakao Auth
    property_keys?: string[];
    properties?: {
      [key: string]: unknown;
    };
    scopes?: string[];
    [key: string]: unknown;
  };
}

export interface IAPIProps extends IAPIBaseProps {
  success?: (o: unknown) => void;
  fail?: (o: unknown) => void;
  always?: (o: unknown) => void;
}

export interface IKakaoAPI {
  request: (props: IAPIProps) => void;
  requestAsync: (props: IAPIBaseProps) => Promise<unknown>;
}

export interface IKakaoDefault {
  init: (appKey: string) => Promise<void>;
  isInitialized: () => Promise<boolean>;
  API: IKakaoAPI;
}

export interface IAuthAuthorizeProps {
  redirectUri?: string;
  state?: string;
  scope?: string;
  nonce?: string;
  throughTalk?: boolean;
}

export interface IAuthLoginBaseProps {
  scope?: string;
}

export interface IAuthLoginProps extends IAuthLoginBaseProps {
  success?: (response: unknown) => void;
  fail?: (error: unknown) => void;
}

export interface IKakaoAuth {
  authorize: (props: IAuthAuthorizeProps) => Promise<void>;
  setAccessToken: (accessToken: string) => void;
  getAccessToken: () => string;
  logout: (handler: () => void) => void;
  logoutAsync: () => Promise<void>;
  login: (props: IAuthLoginProps) => void;
  loginAsync: (props: IAuthLoginBaseProps) => Promise<unknown>;
}

export interface ILinkHrefProps {
  mobileWebUrl?: string;
  webUrl?: string;
  androidExecutionParams?: string;
}
export interface ILinkContentProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  link?: ILinkHrefProps;
}

export interface ILinkItemContentProps {
  profileText?: string;
  profileImageUrl?: string;
  titleImageUrl?: string;
  titleImageText?: string;
  titleImageCategory?: string;
  items?: {
    item?: string;
    itemOp?: string;
  }[];
  sum?: string;
  sumOp?: string;
}

export interface ILinkButtonProps {
  title: string;
  link?: ILinkHrefProps;
}

export interface ILinkBaseProps {
  objectType?: 'feed' | 'list' | 'location' | 'commerce' | 'text';

  // Feed Type
  content?: ILinkContentProps;
  itemContent?: ILinkItemContentProps;
  social?: {
    likeCount?: number;
    commentCount?: number;
    sharedCount?: number;
  };
  buttons?: ILinkButtonProps[];

  // List
  headerTitle?: string;
  headerLink?: ILinkHrefProps;
  contents?: ILinkContentProps[];

  // Location
  address?: string;
  addressTitle?: string;

  // commerce
  commerce?: {
    productName?: string;
    regularPrice?: number;
    discountRate?: number;
    discountPrice?: number;
  };

  // text
  text?: string;
  link?: ILinkButtonProps;

  serverCallbackArgs?: {
    // 사용자 정의 파라미터 설정
    [key: string]: unknown;
  };
}

export interface ILinkCreateButtonProps extends ILinkBaseProps {
  container?: string;
}

export interface ILinkCustomBaseProps {
  templateId: string;
  templateArgs?: {
    [key: string]: unknown;
  };

  serverCallbackArgs?: {
    // 사용자 정의 파라미터 설정
    [key: string]: unknown;
  };
}

export interface ILinkCreateCustomButtonProps extends ILinkCustomBaseProps {
  container?: string;
}

export interface ILinkScrapBaseProps {
  requestUrl: string;
  templateId?: string;

  serverCallbackArgs?: {
    // 사용자 정의 파라미터 설정
    [key: string]: unknown;
  };
}

export interface ILinkCreateScrapButtonProps extends ILinkScrapBaseProps {
  container?: string;
}

export interface IKakaoLink {
  createDefaultButton: (props: ILinkCreateButtonProps) => void;
  sendDefault: (props: ILinkBaseProps) => Promise<void>;
  createCustomButton: (props: ILinkCreateCustomButtonProps) => void;
  sendCustom: (props: ILinkCustomBaseProps) => Promise<void>;
  createScrapButton: (props: ILinkCreateScrapButtonProps) => void;
  sendScrap: (props: ILinkScrapBaseProps) => Promise<void>;
  uploadImage: (props: { file: unknown[] }) => Promise<void>;
  scrapImage: (props: { imageUrl: string }) => Promise<void>;
  deleteImage: (props: { imageUrl: string }) => Promise<void>;
}

export interface IStoryBaseProps {
  url: string;
  text: string;
}

export interface IStoryDefaultProps extends IStoryBaseProps {
  container?: string;
}
export interface IStoryFollowProps {
  container?: string;
  id?: string;
}

export interface IKakaoStory {
  createShareButton: (props: IStoryDefaultProps) => React.FC | void;
  share: (props: IStoryBaseProps) => Promise<void>;
  open: (props: IStoryBaseProps) => Promise<void>;
  createFollowButton: (props: IStoryFollowProps) => void;
}

export interface IChannelBaseProps {
  channelPublicId: string;
}

export interface IChannelDefaultProps extends IChannelBaseProps {
  container?: string;
}

export interface IKakaoChannel {
  createAddChannelButton: (props: IChannelDefaultProps) => React.FC | void;
  addChannel: (props: IChannelBaseProps) => Promise<void>;
  createChatButton: (props: IChannelDefaultProps) => React.FC | void;
  chat: (props: IChannelBaseProps) => Promise<void>;
}

export interface INaviBaseProps {
  name: string;
  x: number;
  y: number;
  coordType?: 'wgs84' | 'katec';
}

export interface INaviStartProps extends INaviBaseProps {
  vehicleType?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  rpOption?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 100;
  routeInfo?: boolean;
  sX?: number;
  sY?: number;
  sAngle?: number;
  returnUri?: string;
  viaPoints?: INaviBaseProps[];
}

export interface IKakaoNavi {
  start: (props: INaviStartProps) => void;
  share: (props: INaviBaseProps) => Promise<void>;
}

export interface IKakao extends IKakaoDefault {
  Auth?: IKakaoAuth;
  Link?: IKakaoLink;
  Story?: IKakaoStory;
  Channel?: IKakaoChannel;
  Navi?: IKakaoNavi;
}
