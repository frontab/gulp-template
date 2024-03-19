import browserSync from "browser-sync";
import config from '../config';

const server = browserSync.create();

const serverStart = (callback) => {
  server.init({
    server: {
      baseDir: config.server.baseDir,
    },
    open: false,
    notify: false,
  });

  callback();
};

const serverReload = (callback) => {
  server.reload();
  callback();
};

export { serverStart, serverReload };
