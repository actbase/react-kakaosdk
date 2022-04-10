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
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Link.createDefaultButton(props);
};

const sendDefault = async (props: ILinkBaseProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Link.sendDefault(props);
};

const createCustomButton = (props: ILinkCreateCustomButtonProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Link.createCustomButton(props);
};

const sendCustom = async (props: ILinkCustomBaseProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Link.sendCustom(props);
};

const createScrapButton = (props: ILinkCreateScrapButtonProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Link.createScrapButton(props);
};

const sendScrap = async (props: ILinkScrapBaseProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Link.sendScrap(props);
};

const uploadImage = async (props: { file: unknown[] }) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Link.uploadImage(props);
};

const scrapImage = async (props: { imageUrl: string }) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Link.scrapImage(props);
};

const deleteImage = async (props: { imageUrl: string }) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) throw { message: 'not initialized' };
  window.Kakao.Link.deleteImage(props);
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
