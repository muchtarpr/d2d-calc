'use strict';

const next = require('next');
const { withPlugins } = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextGlobal = {
	compiler: {
		styledComponents: true,
	},
	poweredByHeader: false,
	swcMinify: false,
};

const nextEslint = {
	eslint: {
		ignoreDuringBuilds: true,
	},
};

const nextWithPWA = {
	pwa: {
		disable: process.env.NODE_ENV === 'development',
		sw: 'service-worker.js',
		publicExcludes: [
			'!assets/excel/**/*',
			'!assets/uploads/**/*',
			'!uploads/**/*',
		],
		runtimeCaching,
	},
};

const svgWebpack = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};

const imageDomain = {
	images: {
		domains: ['img.goapotik.com'],
	},
};

module.exports = withPlugins([
	[nextGlobal],
	[nextEslint],
	[withPWA(nextWithPWA)],
	[svgWebpack],
	[imageDomain],
]);
