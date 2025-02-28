const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: "development",
    cache: false,
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(glb|gltf)$/,
                exclude: '/node_modules',
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        port: 8000,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Learn Three.js'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/models', to: 'models' },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
    ]
}