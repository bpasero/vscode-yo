'use strict';

import * as path from 'path';
import CodeAdapter from './adapter';
import yeoman = require('yeoman-environment');

const win32 = process.platform === 'win32';

const getNpmPaths = function () {
	if (process.env.NODE_PATH) {
		return process.env.NODE_PATH.split(path.delimiter);
	}

	require('fix-path')();

	// Get the npm path from the user env variables.
	const paths = process.env.PATH.split(path.delimiter).map(item => path.join(item, '..', 'lib', 'node_modules'));

	// Default paths for each system
	if (win32) {
		paths.push(path.join(process.env.APPDATA, 'npm/node_modules'));
	} else {
		paths.push('/usr/lib/node_modules');
	}

	return paths.reverse();
};

export default function (args?: any[], opts?: any) {
	args = args || [];
	opts = opts || {};

	let env = yeoman.createEnv(args, opts, new CodeAdapter());
	env.getNpmPaths = getNpmPaths;

	return env;
}
