import { IKakaoNavi, INaviBaseProps, INaviStartProps } from './types';

const start = (props: INaviStartProps) => {
  console.log(props);
};
const share = async (props: INaviBaseProps) => {
  console.log(props);
};

const Navi: IKakaoNavi = {
  start,
  share,
};

export default Navi;
