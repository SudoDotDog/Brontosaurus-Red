/**
 * @author WMXPY
 * @namespace Webpack
 * @description Typescript Loader
 */

module.exports = (tsconfig) => {

    return {
        test: /\.tsx?$/,
        use: [{
            loader: 'awesome-typescript-loader',
            options: {
                configFileName: tsconfig,
            },
        }],
    };
}