import { IKakaoNavi, INaviBaseProps, INaviStartProps } from './types';

const start = (props: INaviStartProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Navi.start(props);
};
const share = async (props: INaviBaseProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Navi.share(props);
};

const Navi: IKakaoNavi = {
  start,
  share,
};

export default Navi;
