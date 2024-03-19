import { series, parallel } from 'gulp';

import config from './gulp/config';

config.setEnv();

export const build = series(
  parallel(),
  parallel(),
);

export const dev = series(
  build,
  parallel(),
);
