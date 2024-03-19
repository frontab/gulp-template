import { series, parallel } from 'gulp';
import { clean } from './gulp/tasks/clean';

import config from './gulp/config';

config.setEnv();

export const build = series(
  clean,
  parallel(),
  parallel(),
);

export const dev = series(
  build,
  parallel(),
);
