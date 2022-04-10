import app from './app';
import { IKakao } from './types';

const { name, version, homepage } = require('../package.json');
console.log(`
   ___  ______________  ___   ________
  / _ |/ ___/_  __/ _ )/ _ | / __/ __/
 / __ / /__  / / / _  / __ |_\\ \\/ _/  
/_/ |_\\___/ /_/ /____/_/ |_/___/___/ 
 
${name} ${version} :: Actbase Opensources.
Contact us -> project@actbase.io
> https://actbase.io/opensource
> ${homepage}
`);

export const Kakao: IKakao = {
  init: app.init,
  isInitialized: app.isInitialized,
  API: app.API,
};

export default Kakao;

/*

Kakao.init()
Kakao.isInitalized()
Kakao.API.request()
Kakao.Auth.login()
Kakao.Auth.authorize()
Kakao.Auth.setAccessToken()
Kakao.Auth.getAccessToken()
Kakao.Auth.logout()
Kakao.Link.createDefaultButton()
Kakao.Link.sendDefault()
Kakao.Link.createCustomButton()
Kakao.Link.createScrapButton()
Kakao.Link.sendScrap()
Kakao.Link.uploadImage()
Kakao.Link.scrapImage()
Kakao.Link.deleteImage()
Kakao.Story.createShareButton();
Kakao.Story.share();
Kakao.Story.open();
Kakao.Story.createFollowButton();
Kakao.Channel.createAddChannelButton();
Kakao.Channel.addChannel();
Kakao.Channel.createChatButton();
Kakao.Channel.chat();
Kakao.Navi.start();
Kakao.Navi.share();





 */
