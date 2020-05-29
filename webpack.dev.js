"use strict";
const path = require("path");
//const HtmlWebpackPlugin = require('html-webpack-plugin'); //help build html pages with files with hash names
const merge = require("webpack-merge"); //help merge with other information
const HtmlWebpackPlugin = require('html-webpack-plugin'); //help build html pages with files with hash names

const webpackConfig = require("./webpack.config.js");


module.exports = merge(webpackConfig, {
    mode: "development", //production is default
    devtool: "none", //prevents from wrapping the code in "eval()"
    //entry: "./src/index.js",
    output: {
        filename: "main.js",
        //filename: "main.[contentHash].js", //prevents file from caching
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new HtmlWebpackPlugin({
        //filename: "index.html", //optional, if you want to use multiple files or rename the files
        //chunks: [], //optional, to specify which file entries it should select
        template: "./src/template.html"
    })],
    /*
    module: {
        rules: [
            //CSS.
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"] //css-loader, just loads the file. style-loader, applies the styles in DOM. css-loader has to load first, the the order here is reverse.
                //use: ["css-loader"]
            },
            //SASS.
            //CSS.
            {
                test: /\.scss$/,
                use: [
                    "style-loader", //3 - injects styles into DOM
                    "css-loader", //2 - turns css into commonjs
                    "sass-loader" //1 - tuns sass into css
                ]
            }
        ]
    }
    */
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
            }
        ]
    }    
});