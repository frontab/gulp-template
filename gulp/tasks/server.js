import browserSync from 'browser-sync';
import { config } from '../config';

const server = browserSync.create();

export const serverStart = (callback) => {
	server.init({
		server: {
			baseDir: config.server.baseDir,
		},
		open: false,
		notify: false,
	});
	callback();
};

export const serverReload = (done) => {
	server.reload();
	done();
};
