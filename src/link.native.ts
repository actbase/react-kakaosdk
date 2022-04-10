import {
  IKakaoLink,
  ILinkBaseProps,
  ILinkCreateButtonProps,
  ILinkCreateCustomButtonProps,
  ILinkCreateScrapButtonProps,
  ILinkCustomBaseProps,
  ILinkScrapBaseProps,
} from './types';

const createDefaultButton = (props: ILinkCreateButtonProps) => {
  console.log(props);
};

const sendDefault = async (props: ILinkBaseProps) => {
  console.log(props);
};

const createCustomButton = (props: ILinkCreateCustomButtonProps) => {
  console.log(props);
};

const sendCustom = async (props: ILinkCustomBaseProps) => {
  console.log(props);
};

const createScrapButton = (props: ILinkCreateScrapButtonProps) => {
  console.log(props);
};

const sendScrap = async (props: ILinkScrapBaseProps) => {
  console.log(props);
};

const uploadImage = async (props: { file: unknown[] }) => {
  console.log(props);
};

const scrapImage = async (props: { imageUrl: string }) => {
  console.log(props);
};

const deleteImage = async (props: { imageUrl: string }) => {
  console.log(props);
};

const Link: IKakaoLink = {
  createDefaultButton,
  sendDefault,
  createCustomButton,
  sendCustom,
  createScrapButton,
  sendScrap,
  uploadImage,
  scrapImage,
  deleteImage,
};

export default Link;
