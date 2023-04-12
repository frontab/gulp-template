import { series, parallel } from 'gulp';
import { clean } from './gulp/tasks/clean';
import { serverStart } from './gulp/tasks/server';

export const dev = series(
	clean,
	serverStart,
	parallel(),
);

export const build = series(
	parallel(),
);
