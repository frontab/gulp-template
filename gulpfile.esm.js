import { series, parallel } from 'gulp';
import { clean } from './gulp/tasks/clean';
import { serverStart, serverReload } from './gulp/tasks/server';

import config from './gulp/config';

config.setEnv();

export const build = series(
  clean,
);

export const dev = series(
  build,
  serverStart,
);
