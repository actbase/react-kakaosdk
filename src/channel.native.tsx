import * as React from 'react';
import { IChannelBaseProps, IChannelDefaultProps, IKakaoChannel } from './types';
import { NativeModules, TouchableOpacity } from 'react-native';

const { RNAKakaoSDK } = NativeModules;

const addChannel = async (props: IChannelBaseProps) => {
  return await RNAKakaoSDK.channel_addChannel(props.channelPublicId);
};

const createAddChannelButton = (props: IChannelDefaultProps): React.FC => {
  if (props.container) {
    console.warn('container field is Web Only.');
  }
  return subProps => (
    <TouchableOpacity onPress={() => addChannel({ channelPublicId: props.channelPublicId })} {...subProps} />
  );
};

const chat = async (props: IChannelBaseProps) => {
  return await RNAKakaoSDK.channel_chat(props.channelPublicId);
};

const createChatButton = (props: IChannelDefaultProps): React.FC => {
  if (props.container) {
    console.warn('container field is Web Only.');
  }
  return subProps => (
    <TouchableOpacity onPress={() => chat({ channelPublicId: props.channelPublicId })} {...subProps} />
  );
};

const Channel: IKakaoChannel = {
  createAddChannelButton,
  addChannel,
  createChatButton,
  chat,
};

export default Channel;
