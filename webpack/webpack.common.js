const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                exclude: [path.resolve(__dirname, '../node_modules')],
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@manifest': path.resolve(__dirname, '../manifest.json'),
        },
    },
    target: 'node',
};
