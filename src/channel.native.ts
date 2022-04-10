import { IChannelBaseProps, IChannelDefaultProps, IKakaoChannel } from './types';

const createAddChannelButton = (props: IChannelDefaultProps) => {
  console.log(props);
};
const addChannel = async (props: IChannelBaseProps) => {
  console.log(props);
};
const createChatButton = (props: IChannelDefaultProps) => {
  console.log(props);
};
const chat = async (props: IChannelBaseProps) => {
  console.log(props);
};

const Channel: IKakaoChannel = {
  createAddChannelButton,
  addChannel,
  createChatButton,
  chat,
};

export default Channel;
