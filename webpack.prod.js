"use strict";

const path = require("path");
//const HtmlWebpackPlugin = require('html-webpack-plugin'); //help build html pages with files with hash names
const merge = require("webpack-merge"); //help merge with other information
const HtmlWebpackPlugin = require('html-webpack-plugin'); //help build html pages with files with hash names
//const CleanWebpackPlugin = require("clean-webpack-plugin"); //error
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //extract css from js into separate css file
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //minify css
const TerserPlugin = require("terser-webpack-plugin"); //it´s used as default to minify js, but when we define the "optimization:" option, it needs to be set manually

const webpackConfig = require("./webpack.config.js");


module.exports = merge(webpackConfig, {
    mode: "production", //production is default
    devtool: "none", //prevents from wrapping the code in "eval()"
    //entry: "./src/index.js",
    entry: {
        "backend":"./src/backend.src.js",
        "backend-vendor":"./src/backend-vendor.src.js"
        //"functions-syncsystem":"./app_js/functions-syncsystem.js"
        //vendor: "./src/vendor.js" 
    }, 
    output: {
        //filename: "main.js",
        //filename: "main.[contentHash].js", //prevents file from caching
        //filename: "[name].[contentHash].bundle.js", //prevents file from caching //single file output
        filename: "[name].bundle.js", //prevents file from caching //single file output
        path: path.resolve(__dirname, "dist")
        //path: path.resolve(__dirname, "app_styles")
    },
    //minify miltiple types of files
    optimization: {
        minimize: true,
        concatenateModules: true,
        namedModules: true,
        minimizer: [
            new TerserPlugin(), //has to be added manually, when "optimization:" is defined
            new OptimizeCssAssetsPlugin() //minify css
        ]
    }, 
    /*
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html"
    })],
    */
    plugins: [
        new HtmlWebpackPlugin({
            //inject: true,
            //filename: "index.html", //optional, if you want to use multiple files or rename the files
            //filename: "index.webpack_debug.html", //optional, if you want to use multiple files or rename the files
            //template: "./src/template.html",
            //chunks: [], //optional, to specify which file entries it should select
            minify: {
                //removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        /*
        For multiple HTML files, simply duplicate this part of the code.
        ref: https://youtu.be/y_RFOaSDL8I?list=PL55RiY5tL51rcCnrOrZixuOsZhAHHy6os
        */
       //new MiniCssExtractPlugin({filename: "[name].[contentHash].bundle.css"}), 
       new MiniCssExtractPlugin({filename: "styles-[name].bundle.css"}), 
       new CleanWebpackPlugin()
    ],
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
            //JS (transpile to es5)
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            //presets: ["es2015"] //can have more or others //didn´t work, even installing the latest dependencies @babel/core - probably only works with webpack 2
                            //presets: ["@babel/preset-env"] //can have more or others

                            presets: [
                                ["@babel/preset-env", {
                                  "modules": "commonjs"
                                }]
                            ]
                            
                        }
                    }
                ]
            },            
            //CSS.
            {
                test: /\.css$/,
                use: [
                    //"style-loader", 
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ] //css-loader, just loads the file. style-loader, applies the styles in DOM. css-loader has to load first, the the order here is reverse.
                //use: ["css-loader"]
            },

            //SASS.
            {
                test: /\.scss$/,
                use: [
                    //"style-loader", //3 - injects styles into DOM //substituted with the mini-css-extract-plugin
                    MiniCssExtractPlugin.loader, //3 - extract css into separate files
                    "css-loader", //2 - turns css into commonjs
                    "sass-loader" //1 - tuns sass into css
                ]
            }
        ]
    }    
});