import { IKakaoNavi, INaviBaseProps, INaviStartProps } from './types';
import { NativeModules } from 'react-native';

const { RNAKakaoSDK } = NativeModules;

const start = (props: INaviStartProps) => {
  // TODO Navi start
  console.log(props);
};
const share = async (props: INaviBaseProps) => {
  // TODO Navi share
  console.log(props);
};

const Navi: IKakaoNavi = {
  start,
  share,
};

export default Navi;
