// Trong customWebpackConfig.js
const withImages = require('next-images');

module.exports = withImages({
    images: {
        domains: ['res.cloudinary.com'],
    },
    webpack(config, options) {
        config.module.rules.push(
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            outputPath: 'static/images/',
                            publicPath: '/_next/static/images/',
                        },
                    },
                ],
            },
            {
                test: /\.(mp3)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            outputPath: 'static/audio/',
                            publicPath: '/_next/static/audio/',
                        },
                    },
                ],
            },

        );

        return config;
    },
});
