const sourceFolder = './source';
const buildFolder = './build';
const preBuildFolder = './pre-build';

const config = {
  sourceFolder,
  buildFolder,
  preBuildFolder,

  clean: {
    build: buildFolder,
  },

  server: {
    baseDir: buildFolder,
  },

  copy: {
    base: `${sourceFolder}/assets`,
    src: [
      `${sourceFolder}/assets/favicon/*.{png,xml,ico,svg,webmanifest}`,
      `${sourceFolder}/assets/files/**/*.*`,
    ],
    dest: buildFolder,
    watch: [
      `${sourceFolder}/assets/favicon/*.{png,xml,ico,svg,webmanifest}`,
      `${sourceFolder}/assets/files/**/*.*`,
    ],
  },

  fonts: {
    src: `${sourceFolder}/assets/fonts/**/*.woff2`,
    dest: `${buildFolder}/fonts`,
    watch: `${sourceFolder}/assets/fonts/**/*.woff2`,
    convert: {
      src: `${sourceFolder}/assets/fonts/**/*.ttf`,
      dest: `${sourceFolder}/assets/fonts`,
      watch: `${sourceFolder}/assets/fonts/**/*.ttf`,
    },
    config: {
      srcFolder: `${sourceFolder}/assets/fonts`,
      dest: `${sourceFolder}/config/pug/_fonts.pug`,
    },
  },

  pug: {
    src: `${sourceFolder}/pages/**/*.pug`,
    dest: buildFolder,
    watch: `${sourceFolder}/**/*.pug`,
    data: {
      srcFolder: `${sourceFolder}/data`,
      dest: `${sourceFolder}/config/pug/_data.pug`,
      watch: `${sourceFolder}/data`,
    },
    mixins: {
      srcFolder: `${sourceFolder}/components`,
      dest: `${sourceFolder}/config/pug/_mixins.pug`,
      watch: `${sourceFolder}/components`,
    },
  },

  images: {
    src: `${sourceFolder}/assets/images/**/*.{jpg,jpeg,png,gif,svg,webp}`,
    dest: `${buildFolder}/images`,
    watch: `${sourceFolder}/assets/images/**/*.{jpg,jpeg,png,gif,svg,webp}`,
  },

  svgSprites: {
    src: `${sourceFolder}/assets/icons`,
    dest: `${buildFolder}/images`,
    watch: `${sourceFolder}/assets/icons`,
    spritesFolder: `${sourceFolder}/config/styles/_icons`,
    icons: `${sourceFolder}/config/styles/_icons.scss`,
  },

  emails: {
    src: `${sourceFolder}/emails/**/*.html`,
    dest: `${buildFolder}/emails`,
    watch: `${sourceFolder}/emails/**/*.html`,
  },

  setEnv() {
    this.isBuild = process.argv.includes('build');
    this.isRelease = process.argv.includes('--release');
    this.isDev = !this.isBuild;
  },
};

export default config;
