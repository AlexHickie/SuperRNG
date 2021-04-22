'use strict';

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshBabel = require('react-refresh/babel')
const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
	const isDevelopment = argv.mode === 'development';

	return {
		target: process.env.NODE_ENV !== 'production' ? 'web' : 'browserslist',
		entry: {
			index: './src/index.js'
		},
		output: {
			path: path.join(__dirname, 'docs'),
			filename: '[name].bundle.[contenthash].js',
			clean: true
		},
		devServer: {
			contentBase: path.join(__dirname, 'src'),
			compress: true,
			hot: true,
			port: 8080
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							plugins: [
								isDevelopment && ReactRefreshBabel
							].filter(Boolean)
						}
					}
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: 'html-loader',
							options: {
								minimize: true
							}
						}
					]
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: 'file-loader'
						}
					]
				},
				{
					test: /\.module\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: {
									localIdentName: '[local]-[hash:base64:5]'
								}
							}
						},
						'postcss-loader'
					]
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: false
							}
						},
						'postcss-loader'
					],
					exclude: /\.module\.css$/
				}
			]
		},
		plugins: [
			isDevelopment && new webpack.HotModuleReplacementPlugin(),
			isDevelopment && new ReactRefreshWebpackPlugin(),
			new HtmlWebPackPlugin({
				favicon: 'public/favicon.ico',
				template: 'public/index.html',
				filename: 'index.html'
			})
		].filter(Boolean)
	}
};
