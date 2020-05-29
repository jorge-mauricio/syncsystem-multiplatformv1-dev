"use strict";
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //help build html pages with files with hash names


module.exports = {
    //mode: "development", //production is default
    devtool: "none", //prevents from wrapping the code in "eval()"
    //entry: "./src/index.js", //single file bundle
    entry: {
        main:"./src/index.js",
        vendor: "./src/vendor.js" 
    }, 
    output: {
        //filename: "main.js",
        //filename: "main.[contentHash].js", //prevents file from caching //single file output
        filename: "[name].[contentHash].bundle.js", //prevents file from caching //single file output //Note: vendor.js may not need hash, since it´s not updated constantly
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html"
    })],
    module: {
        rules: [
            //CSS.
            {
                test: /\.css$/,
                use: [
                    "style-loader", 
                    "css-loader"
                ] //css-loader, just loads the file. style-loader, applies the styles in DOM. css-loader has to load first, the the order here is reverse.
                //use: ["css-loader"]
            },
            //SASS.
            {
                test: /\.scss$/,
                use: [
                    "style-loader", //3 - injects styles into DOM
                    "css-loader", //2 - turns css into commonjs
                    "sass-loader" //1 - tuns sass into css
                ]
            },
            //HTML
            {
                test: /\.html$/,
                use: [
                    "html-loader"
                ]
            },
            //Files
            {
                /**/
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                //test: "/\.png$/",
                use: {
                    loader: "file-loader",
                    options: {
                        //name: "[name].[ext]"
                        //name: "imgs/[name].[hash].[ext]"
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs",
                        esModule: false //prevents from displaying [object Module] in the output file (test on server)
                    }
                }
                

                /*
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                loader: 'file',
                query: {
                name: '[name].[hash:7].[ext]',
                publicPath: '/static/images/',
                outputPath: '../images/'
                }
                */

            }
        ]
    }
};