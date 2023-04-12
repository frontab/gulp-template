import { series, parallel } from 'gulp';
import { clean } from './gulp/tasks/clean';

export const dev = series(
	clean(),
	parallel(),
);

export const build = series(
	parallel(),
);
