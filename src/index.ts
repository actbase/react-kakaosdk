import { IKakao } from './types';
import app from './app';
import Auth from './auth';
import Link from './link';
import Story from './story';
import Channel from './channel';
import Navi from './navi';

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
  Auth,
  Link,
  Story,
  Channel,
  Navi,
};

export default Kakao;
