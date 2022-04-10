import * as React from 'react';
import { IChannelBaseProps, IChannelDefaultProps, IKakaoChannel } from './types';
import { NativeModules, TouchableWithoutFeedback } from 'react-native';

const { RNAKakaoSDK } = NativeModules;

const createAddChannelButton = (props: IChannelDefaultProps): React.FC => {
  if (props.container) {
    console.warn('container field is Web Only.');
  }
  return subProps =>
    React.createElement(TouchableWithoutFeedback, {
      onPress: () => addChannel({ channelPublicId: props.channelPublicId }),
      ...subProps,
    });
};

const addChannel = async (props: IChannelBaseProps) => {
  // TODO Channel addChannel
  console.log(props);
};

const createChatButton = (props: IChannelDefaultProps): React.FC => {
  if (props.container) {
    console.warn('container field is Web Only.');
  }
  return subProps =>
    React.createElement(TouchableWithoutFeedback, {
      onPress: () => chat({ channelPublicId: props.channelPublicId }),
      ...subProps,
    });
};

const chat = async (props: IChannelBaseProps) => {
  // TODO Channel chat
  console.log(props);
};

const Channel: IKakaoChannel = {
  createAddChannelButton,
  addChannel,
  createChatButton,
  chat,
};

export default Channel;
