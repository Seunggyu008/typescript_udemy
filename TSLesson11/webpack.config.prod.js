const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    //production makes it such that most optimization will be done and as little code will be loaded
    mode: 'production',
    entry: './src/app.ts',
    devServer: {
        static: [
                {
                directory: path.join(__dirname),
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/' 
    },
    devtool: 'none',
    module: {
        rules: [
            {
            //regular expression which tells webpack what files that ends with .ts
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
};
