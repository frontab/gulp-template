import fs from 'fs';
import config from '../config';

const clean = (cb) => {
  fs.stat(config.clean.build, (err) => {
    if (err) return;

    fs.rm(config.clean.build, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
  });

  cb();
};

export { clean };
