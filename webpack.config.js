const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const dist = __dirname + '/dist'

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: dist,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // }
        ]
    },
    plugins: [
        new FaviconsWebpackPlugin({
            mode: 'webapp',
            manifest: 'src/manifest.json'
        }),
        new HtmlWebpackPlugin({
            template: 'src/views/index.html'
        }),
        new WorkboxWebpackPlugin.GenerateSW({}),
        // new CopyPlugin({
        //     patterns: [
        //         { from: "src/manifest.json", to: dist}
        //     ],
        // })
    ]
}