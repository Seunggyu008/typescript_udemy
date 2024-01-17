const path = require('path');

module.exports = {
    //developement makes it that less optimization will be done
    mode: 'development',
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
    devtool: 'inline-source-map',
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
    }
};
