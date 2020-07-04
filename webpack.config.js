const path = require('path');

const URL_NODE_MODULES = 'C:\\Users\\gui20\\AppData\\Roaming\\npm\\node_modules';
const HtmlWebpackPlugin = require(URL_NODE_MODULES + '\\html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer:{
        port: 5000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}