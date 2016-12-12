var path=require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackMd5Hash = require('webpack-md5-hash');
var CleanPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');


module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'app.js'),
        vendor: ['react', 'react-dom', 'react-router', 'material-ui']
    },
    output: {
        path: BUILD_PATH,
        //publicPath: "http://img.58cdn.com.cn/zhuanzhuan/zzactivity/seo/",
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

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './dist_template.html',
            inject: ['body', 'head'],    //允许插件修改哪些内容，包括head与body
            minify:{    //压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: true    //删除空白符与换行符
            }
        }),

        new CopyWebpackPlugin([{
            from: 'mock/',
            to: './'
        }, {
            from: 'src/css/FEmqw.woff2',
            to: './FEmqw.woff2'
        }])

        /*,

        new CopyWebpackPlugin([{
            from: 'data/',
            to: 'data/'
        }, {
            from: 'images/static/',
            to: 'images/static/'
        }])*/
    ],
    devServer: {
        inline: true/*,
        historyApiFallback: {
            index: "/workspace/ZZActivityBackend/fe/seo/dist/"
        },
        contentBase: '/workspace/ZZActivityBackend/fe/seo/dist/',*/
    }
 };
