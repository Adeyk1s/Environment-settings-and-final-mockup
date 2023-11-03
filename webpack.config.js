const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizationCssAssetPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')

const optimization = () => {
    const configObj = {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
            new OptimizationCssAssetPlugin(),
            new TerserWebpackPlugin(),
        ],
    }
    return configObj;
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js','.json'],
    },
    optimization: optimization(),
    plugins:[
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets'),
                }   
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                generator: {
                    filename:'fonts/[name].[contenthash][ext]',
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                generator: {
                    filename: 'assets/[name][ext]',
                },
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_module/, 
                loader: "babel-loader",
                options:{
                    presets: ['@babel/preset-env']
                }
            }
        ]

    }
}