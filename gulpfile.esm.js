import { series, parallel } from 'gulp';
import { clean } from './gulp/tasks/clean';
import { serverStart } from './gulp/tasks/server';
import { copyBuild, copyWatch } from './gulp/tasks/copy';
import { fontsConvert, fontsBuild, fontsWatch } from './gulp/tasks/fonts';
import { pugCheckData, pugCheckMixins, pugBuild, pugWatch } from './gulp/tasks/pug';
import { imagesBuild, imagesWatch } from './gulp/tasks/images';
import { svgSpriteBuild, svgSpriteWatch } from './gulp/tasks/svg-sprites';
import { emailsBuild, emailsWatch } from './gulp/tasks/emails';

import config from './gulp/config';

config.setEnv();

export const build = series(
  clean,
  parallel(
    pugCheckData,
    pugCheckMixins,
    fontsConvert,
  ),
  parallel(
    copyBuild,
    pugBuild,
    fontsBuild,
    imagesBuild,
    svgSpriteBuild,
    emailsBuild,
  ),
);

export const dev = series(
  build,
  serverStart,
  parallel(
    copyWatch,
    pugWatch,
    fontsWatch,
    imagesWatch,
    svgSpriteWatch,
    emailsWatch,
  ),
);
