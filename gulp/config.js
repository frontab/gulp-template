const buildPath = './build';
const prebuildPath = '/prebuild';
const sourcePath = './source';

export const config = {
	buildPath,
	prebuildPath,
	sourcePath,

	clean: {
		src: `${buildPath}`,
	},

	server: {
		baseDir: `${buildPath}`,
	},
};
