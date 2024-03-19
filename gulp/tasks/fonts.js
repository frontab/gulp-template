import {
  src, dest, watch, series,
} from 'gulp';
import ttf2woff2 from 'gulp-ttf2woff2';
import del from 'del';
import { serverReload } from './server';
import autoImport from '../helpers/autoImport';
import config from '../config';

const fontsConvert = (callback) => {
  src(config.fonts.convert.src)
    .pipe(ttf2woff2())
    .pipe(dest(config.fonts.convert.dest));

  del(config.fonts.convert.src);

  callback();
};

const fontsBuild = (callback) => {
  src(config.fonts.src)
    .pipe(dest(config.fonts.dest));

  autoImport({
    folderPath: config.fonts.config.srcFolder,
    formats: ['woff2'],
    isExtName: true,
    fileImport: config.fonts.config.dest,
    importTemplate(data) {
      return `link(rel="preload" href="fonts${data.path}/${data.name}" as="font" type="font/woff2" crossorigin)\n`;
    },
  });

  callback();
};

const fontsWatch = () => {
  watch(
    config.fonts.convert.watch,
    series(fontsConvert),
  );
  watch(
    config.fonts.watch,
    series(fontsBuild, serverReload),
  );
};

export { fontsConvert, fontsBuild, fontsWatch };
