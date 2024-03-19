import {
  src, dest, watch, series,
} from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import rename from 'gulp-rename';
import { serverReload } from './server';
import autoImport from '../helpers/autoImport';
import config from '../config';

const pugBuild = () => (
  src(config.pug.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: 'Pug',
        message: error.message,
      })),
    }))
    .pipe(pug({
      pretty: true,
      venbose: true,
    }))
    .pipe(rename({
      dirname: '',
    }))
    .pipe(dest(config.pug.dest))
);

const pugCheckData = (callback) => {
  autoImport({
    folderPath: config.pug.data.srcFolder,
    formats: ['pug'],
    fileImport: config.pug.data.dest,
    importTemplate(data) {
      return `include ../../data${data.path}/${data.name}\n`;
    },
  });

  callback();
};

const pugCheckMixins = (callback) => {
  autoImport({
    folderPath: config.pug.mixins.srcFolder,
    formats: ['pug'],
    fileImport: config.pug.mixins.dest,
    importTemplate(data) {
      return `include ../../components${data.path}/${data.name}\n`;
    },
  });

  callback();
};

const pugWatch = () => {
  watch(
    config.pug.data.watch,
    { events: ['add', 'addDir', 'unlink', 'unlinkDir'] },
    series(pugCheckData),
  );
  watch(
    config.pug.mixins.watch,
    { events: ['add', 'addDir', 'unlink', 'unlinkDir'] },
    series(pugCheckMixins),
  );
  watch(
    config.pug.watch,
    series(pugBuild, serverReload),
  );
};

export {
  pugCheckData, pugCheckMixins, pugBuild, pugWatch,
};
