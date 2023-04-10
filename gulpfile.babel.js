import { series, parallel } from 'gulp';

export const dev = series(
	parallel(),
);

export const build = series(
	parallel(),
);
