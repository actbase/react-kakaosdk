import { IChannelBaseProps, IChannelDefaultProps, IKakaoChannel } from './types';

const createAddChannelButton = (props: IChannelDefaultProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Channel.createAddChannelButton(props);
};

const addChannel = async (props: IChannelBaseProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Channel.addChannel(props);
};

const createChatButton = (props: IChannelDefaultProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Channel.createChatButton(props);
};

const chat = async (props: IChannelBaseProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Channel.chat(props);
};

const Channel: IKakaoChannel = {
  createAddChannelButton,
  addChannel,
  createChatButton,
  chat,
};

export default Channel;
