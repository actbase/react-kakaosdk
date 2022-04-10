import {
  IKakaoLink,
  ILinkBaseProps,
  ILinkCreateButtonProps,
  ILinkCreateCustomButtonProps,
  ILinkCreateScrapButtonProps,
  ILinkCustomBaseProps,
  ILinkScrapBaseProps,
} from './types';
import { NativeModules } from 'react-native';

const { RNAKakaoSDK } = NativeModules;

const createDefaultButton = (props: ILinkCreateButtonProps) => {
  // TODO Link createDefaultButton
  console.log(props);
};

const sendDefault = async (props: ILinkBaseProps) => {
  // TODO Link sendDefault
  console.log(props);
};

const createCustomButton = (props: ILinkCreateCustomButtonProps) => {
  // TODO Link createCustomButton
  console.log(props);
};

const sendCustom = async (props: ILinkCustomBaseProps) => {
  // TODO Link sendCustom
  console.log(props);
};

const createScrapButton = (props: ILinkCreateScrapButtonProps) => {
  // TODO Link createScrapButton
  console.log(props);
};

const sendScrap = async (props: ILinkScrapBaseProps) => {
  // TODO Link sendScrap
  console.log(props);
};

const uploadImage = async (props: { file: unknown[] }) => {
  // TODO Link uploadImage
  console.log(props);
};

const scrapImage = async (props: { imageUrl: string }) => {
  // TODO Link scrapImage
  console.log(props);
};

const deleteImage = async (props: { imageUrl: string }) => {
  // TODO Link deleteImage
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
