import { series, parallel } from 'gulp';
import { clean } from './gulp/tasks/clean';
import { serverStart } from './gulp/tasks/server';
import { copyBuild, copyWatch } from './gulp/tasks/copy';
import { fontsConvert, fontsBuild, fontsWatch } from './gulp/tasks/fonts';

import config from './gulp/config';

config.setEnv();

export const build = series(
  clean,
  parallel(
    fontsConvert,
  ),
  parallel(
    copyBuild,
    fontsBuild,
  ),
);

export const dev = series(
  build,
  serverStart,
  parallel(
    copyWatch,
    fontsWatch,
  ),
);
