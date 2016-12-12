var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'app.js')
    },
    output: {
        path: BUILD_PATH,
        filename: path.resolve(APP_PATH, 'bundle.js')
    },
    module: {
        /*preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: APP_PATH + '/components/Add.jsx'
            }
        ],*/
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
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"
            }
        ]
    },
    resolve:{
        extensions:['','.js','.json','.jsx', '.webp', '.woff', '.woff2']
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),

        new ExtractTextPlugin("style.[hash].css", {
            allChunks: false,
        }),
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            filename:'index.html',    //生成的html存放路径，相对于 path
            template:'./dev_template.html',
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:false,    //为静态资源生成hash值
            //chunks:['frame','eeindex'],
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: '\./',
        hot: true,
        inline: true
    }
 };
