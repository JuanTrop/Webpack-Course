const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@templates': path.resolve(__dirname, 'src/templates'),
            '@images': path.resolve(__dirname, 'src/assets/images')

        }
    },
    module: { 
        rules: [
            {
                test: /\.m?.js$/ ,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i ,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.png$/i,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: false,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "../assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash]'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,   "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
}