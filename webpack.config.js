 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const path = require('path');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
 module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'pages', 'index.js'),
    devtool: 'inline-source-map',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        port: 8081,
        open: true,
        hot: true,
        watchFiles: ['*/**/*.html']
    }
 };
 