const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
const htmlWebpackPlugin = require('html-webpack-plugin'); //html插件

var opn = require('opn') //node打开浏览器的一个插件

var entryUrl = process.env.NODE_ENV === 'production'?'./src/index.js':'./src/main.js';
module.exports = {
    entry: entryUrl,
    output: {
        /* 输出目录，没有则新建 */
        path: path.resolve(__dirname, './dist'),
        /* 静态目录，可以直接从这里取文件 */
        publicPath: '/dist/',
        /* 文件名 */
        filename: 'build.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            ]
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            /* 排除模块安装目录的文件 */
            exclude: /node_modules/
        }]
    },
    resolve: {
        alias: {
            reset: path.resolve(__dirname, 'src/lib/reset.css')
        }
    }
    // devServer: { // webpack-dev-server 热加载
    //     historyApiFallback: true,
    //     noInfo: true
    // },
    // plugins: [
    //     new htmlWebpackPlugin({
    //         template: './index.html' // 模版文件
    //     }),
    //     new ExtractTextPlugin({
    //         filename: 'style.css'
    //     })
    // ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
} else {
    module.exports.devtool = '#source-map'
    opn('http://localhost:8080')
}


