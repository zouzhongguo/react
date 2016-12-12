var path=require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackMd5Hash = require('webpack-md5-hash');
var CleanPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
      "webpack/hot/only-dev-server",
      "./src/app.js"
    ],
    output: {
        path: "dist",
        publicPath: "http://img.58cdn.com.cn/zhuanzhuan/ec/static/",
        filename: "[name].[hash].js"
    },
    module: {
        loaders: [
            {
                test:/\.(png)|(jpg)|(webp)$/,
                loader: "url?limit=2048"
            },
            {
                test: /\.js|\.jsx?$/,
                loaders: ['react-hot-loader/webpack', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"
            }
        ]
    },
    resolve:{
        extensions:['','.js','.json','.jsx', '.webp', 'woff', 'woff2']
    },
    plugins: [
        new CleanPlugin('dist'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new WebpackMd5Hash(),

        new ExtractTextPlugin("style.[hash].css", {
            allChunks: false,
        }),

        new webpack.optimize.UglifyJsPlugin(
            {
                compress: {
                    warnings: false
                }
            }
        ),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({    //根据模板插入css/js等生成最终HTML
            filename: 'index.html',    //生成的html存放路径，相对于 path
            template: './dist_template.html',
            inject: ['body', 'head'],    //允许插件修改哪些内容，包括head与body
            minify:{    //压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: true    //删除空白符与换行符
            }
        })/*,

        new CopyWebpackPlugin([{
            from: 'data/',
            to: 'data/'
        }, {
            from: 'images/static/',
            to: 'images/static/'
        }])*/
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true,
        inline: true
    }
 };
