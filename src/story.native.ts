import { IKakaoStory, IStoryBaseProps, IStoryDefaultProps, IStoryFollowProps } from './types';
import { NativeModules, TouchableWithoutFeedback } from 'react-native';
import * as React from 'react';

const { RNAKakaoSDK } = NativeModules;

const createShareButton = (props: IStoryDefaultProps): React.FC => {
  if (props.container) {
    console.warn('container field is Web Only.');
  }
  return subProps =>
    React.createElement(TouchableWithoutFeedback, {
      onPress: () => share({ url: props.url, text: props.text }),
      ...subProps,
    });
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
