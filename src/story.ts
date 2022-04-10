import { IKakaoStory, IStoryBaseProps, IStoryDefaultProps, IStoryFollowProps } from './types';

const createShareButton = (props: IStoryDefaultProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Story.createShareButton(props);
};

const share = async (props: IStoryBaseProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Story.share(props);
};

const open = async (props: IStoryBaseProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Story.open(props);
};

const createFollowButton = (props: IStoryFollowProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Story.createFollowButton(props);
};

const Story: IKakaoStory = {
  createShareButton,
  share,
  open,
  createFollowButton,
};

export default Story;
