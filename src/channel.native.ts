import { IChannelBaseProps, IChannelDefaultProps, IKakaoChannel } from './types';
import { NativeModules } from 'react-native';

const { RNAKakaoSDK } = NativeModules;

const createAddChannelButton = (props: IChannelDefaultProps) => {
  // TODO Channel createAddChannelButton
  console.log(props);
};
const addChannel = async (props: IChannelBaseProps) => {
  // TODO Channel addChannel
  console.log(props);
};
const createChatButton = (props: IChannelDefaultProps) => {
  // TODO Channel createChatButton
  console.log(props);
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
