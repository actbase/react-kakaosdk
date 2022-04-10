import { IKakaoStory, IStoryBaseProps, IStoryDefaultProps, IStoryFollowProps } from './types';

const createShareButton = (props: IStoryDefaultProps) => {
  console.log(props);
};

const share = async (props: IStoryBaseProps) => {
  console.log(props);
};

const open = async (props: IStoryBaseProps) => {
  console.log(props);
};

const createFollowButton = (props: IStoryFollowProps) => {
  console.log(props);
};

const Story: IKakaoStory = {
  createShareButton,
  share,
  open,
  createFollowButton,
};

export default Story;
