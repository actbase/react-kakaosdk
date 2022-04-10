import { IKakaoStory, IStoryBaseProps, IStoryDefaultProps, IStoryFollowProps } from './types';
import { NativeModules } from 'react-native';

const { RNAKakaoSDK } = NativeModules;

const createShareButton = (props: IStoryDefaultProps) => {
  // TODO Story createShareButton
  console.log(props);
};

const share = async (props: IStoryBaseProps) => {
  // TODO Story share
  console.log(props);
};

const open = async (props: IStoryBaseProps) => {
  // TODO Story open
  console.log(props);
};

const createFollowButton = (props: IStoryFollowProps) => {
  // TODO Story createFollowButton
  console.log(props);
};

const Story: IKakaoStory = {
  createShareButton,
  share,
  open,
  createFollowButton,
};

export default Story;
