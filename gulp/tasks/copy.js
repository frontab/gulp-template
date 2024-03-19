import {
  src, dest, watch, series, lastRun,
} from 'gulp';
import plumber from 'gulp-plumber';
import { serverReload } from './server';
import config from '../config';

const copyBuild = () => (
  src(config.copy.src, { base: config.copy.base, since: lastRun(copyBuild) })
    .pipe(plumber())
    .pipe(dest(config.copy.dest))
);

const copyWatch = () => watch(
  config.copy.watch,
  series(copyBuild, serverReload),
);

export { copyBuild, copyWatch };
