import del from 'del';
import config from '../config';

const clean = (cb) => del(config.clean.build);

export { clean };
