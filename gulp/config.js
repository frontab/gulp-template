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

  setEnv() {
    this.isBuild = process.argv.includes('build');
    this.isRelease = process.argv.includes('--release');
    this.isDev = !this.isBuild;
  },
};

export default config;
