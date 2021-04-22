'use strict';

module.exports = {
	plugins: [
		'postcss-normalize',
		'postcss-preset-env',
		[
			'cssnano',
			{
				preset: 'default'
			}
		]
	]
};