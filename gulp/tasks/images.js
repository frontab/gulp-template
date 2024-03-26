import {
  src, dest, watch, series,
} from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpIf from 'gulp-if';
// import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
// import webp from 'gulp-webp';
import cached from 'gulp-cached';
import { serverReload } from './server';
import config from '../config';

const imagesBuild = () => (
  src(config.images.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: 'Images',
        message: error.message,
      })),
    }))
    .pipe(cached('Images'))
    // .pipe(gulpIf(config.isProd, imagemin([
    //   gifsicle({ interlaced: true }),
    //   mozjpeg({ quality: 75, progressive: true }),
    //   optipng({ optimizationLevel: 5 }),
    //   svgo({
    //     plugins: [
    //       { removeViewBox: true },
    //       { cleanupIDs: false },
    //     ],
    //     verbose: true,
    //   }),
    // ])))
    .pipe(dest(config.images.dest))
    .pipe(src(config.images.src))
    .pipe(cached('Webp'))
    // .pipe(webp())
    .pipe(dest(config.images.dest))
);

const imagesWatch = () => watch(config.images.watch, series(imagesBuild, serverReload));

export { imagesBuild, imagesWatch };
