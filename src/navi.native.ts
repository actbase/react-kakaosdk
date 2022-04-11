import { IKakaoNavi, INaviBaseProps, INaviStartProps } from './types';
import { NativeModules } from 'react-native';

const { RNAKakaoSDK } = NativeModules;

const start = (props: INaviStartProps) => {
  RNAKakaoSDK.navi_start(props);
};
const share = async (props: INaviBaseProps) => {
  RNAKakaoSDK.navi_share(props);
};

const Navi: IKakaoNavi = {
  start,
  share,
};

export default Navi;
