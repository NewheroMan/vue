var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 返回一个对象，这个对象就包含着当前Webpack的配置
module.exports = {
    // 入口：你想打包构建的源文件路径--相对路径
    entry: './src/main.js',
    // 输出
    output: {
        // 这个path需要的是全路径--目录
        path: path.join(__dirname, "components"),
        // 文件名称
        filename: 'main.js'
    },
    // 建议使用这个配置，新版本建议这样配置,默认会生成main.js
    // devServer: {
    //     // 设置对外公开路径，后期这个目录中的文件可以被外界访问
    //     publicPath: '/dist'
    // },
    // 下面这个成员就是不同类型的文件的解析加载规则
    module: {
        rules: [
            // 配置的是用来解析.css文件的loader(style-loader和css-loader)
            {
                // 1.0 用正则匹配当前访问的文件的后缀名是  .css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
            },
            // 添加对处理器less的支持
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            // 添加图片和图标的处理
            {
                // png|jpg|gif:常见的图片资源
                // eot|svg|ttf|woff:字体图标或web字体的字体源文件
                // |eot|svg|ttf|woff
                test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // limit表示如果图片大于50000byte，就以路径形式展示，小于的话就用base64格式展示
                        limit: 10000
                    }
                }]
            },
            {
                test: /\.js$/,
                // Webpack2建议尽量避免exclude，更倾向于使用include
                // exclude: /(node_modules)/, // node_modules下面的.js文件会被排除
                include: [path.resolve(__dirname, 'src')],
                use: {
                    loader: 'babel-loader',
                    // options里面的东西可以放到.babelrc文件中去
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'aa.html',
            filename:'index.html',
            inject:'body'
        })
    ]
}