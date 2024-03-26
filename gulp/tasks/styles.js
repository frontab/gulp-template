import { src, dest, watch, series } from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import gcmq from "gulp-group-css-media-queries";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import { serverReload } from "./server";
import autoImport from "../helpers/autoImport";
import getDirectories from '../helpers/getDirectories';
import config from "../config";

const sass = gulpSass(dartSass);

const stylesBuild = () =>
  src(config.styles.src, { sourcemaps: config.isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "Scss",
          message: error,
        })),
      })
    )
    .pipe(sass())
    .pipe(
      gulpif(
        config.isProd,
        autoPrefixer({
          cascade: true,
        })
      )
    )
    .pipe(gcmq())
    .pipe(
      rename({
        suffix: ".min",
        dirname: "",
      })
    )
    .pipe(csso())
    .pipe(dest(config.styles.dest, { sourcemaps: config.isDev }));

const stylesCheckMixins = (callback) => {
  autoImport({
    folderPath: config.styles.mixins.srcFolder,
    formats: ["scss"],
    fileImport: config.styles.mixins.dest,
    importTemplate(data) {
      return `@import 'mixins${data.path}/${data.name}';\n`;
    },
  });

  callback();
};

const stylesCheckIcons = (callback) => {
  autoImport({
    folderPath: config.styles.icons.srcFolder,
    formats: ["scss"],
    fileImport: config.styles.icons.dest,
    importTemplate(data) {
      return `@import '_icons${data.path}/${data.name}';\n`;
    },
  });

  callback();
};

const stylesCheckVariables = (callback) => {
  autoImport({
    folderPath: config.styles.variables.srcFolder,
    formats: ["scss"],
    fileImport: config.styles.variables.dest,
    ignoreDirectorys: ['palette'],
    importTemplate(data) {
      return `@import 'variables${data.path}/${data.name}';\n`;
    },
  });

  callback();
};

const stylesCheckCommons = (callback) => {
  autoImport({
    folderPath: config.styles.commons.srcFolder,
    formats: ["scss"],
    fileImport: config.styles.commons.dest,
    importTemplate(data) {
      return `@import 'commons${data.path}/${data.name}';\n`;
    },
  });

  callback();
};

const stylesCheckPalette = (callback) => {
  autoImport({
    folderPath: config.styles.palette.srcFolder,
    formats: ["scss"],
    fileImport: config.styles.palette.dest,
    importTemplate(data) {
      return `@import 'palette${data.path}/${data.name}';\n`;
    },
  });

  callback();
};

const stylesWatch = () => {
  watch(
    config.styles.mixins.watch,
    { events: ["add", "addDir", "unlink", "unlinkDir"] },
    series(stylesCheckMixins)
  );
  watch(
    config.styles.icons.watch,
    { events: ["add", "addDir", "unlink", "unlinkDir"] },
    series(stylesCheckIcons)
  );
  watch(
    config.styles.variables.watch,
    { events: ["add", "addDir", "unlink", "unlinkDir"] },
    series(stylesCheckVariables)
  );
  watch(
    config.styles.commons.watch,
    { events: ["add", "addDir", "unlink", "unlinkDir"] },
    series(stylesCheckCommons)
  );
  watch(
    config.styles.palette.watch,
    { events: ["add", "addDir", "unlink", "unlinkDir"] },
    series(stylesCheckPalette)
  );
  watch(config.styles.watch, series(stylesBuild, serverReload));
};

export {
  stylesCheckPalette,
  stylesCheckCommons,
  stylesCheckVariables,
  stylesCheckMixins,
  stylesCheckIcons,
  stylesBuild,
  stylesWatch,
};
