"use strict";
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //help build html pages with files with hash names


module.exports = {
    //mode: "development", //production is default
    devtool: "none", //prevents from wrapping the code in "eval()"
    //entry: "./src/index.js", //single file bundle
    entry: {
        //main:"./src/index.js",
        //vendor: "./src/vendor.js" 
    }, 
    output: {
        //filename: "main.js",
        //filename: "main.[contentHash].js", //prevents file from caching //single file output
        filename: "[name].[contentHash].bundle.js", //prevents file from caching //single file output //Note: vendor.js may not need hash, since it´s not updated constantly
        //publicPath: "/dist", //in case of any problems running the configuration //for most cases, it applies only if the files are outside /src folder
        path: path.resolve(__dirname, "dist")
    },
    /*
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html"
    })],
    */
    module: {
        //Note: Double check to see if this part is overridden but webpack.prod or webpack.dev.
        rules: [
            /*
            //CSS.
            {
                test: /\.css$/,
                use: [
                    "style-loader", 
                    "css-loader" //enables to import css files directly into js files
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
            },*/ /*moved to webpack.dev.js */

            //JS (transpile to es5)
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            //presets: ["es2015"] //can have more or others //didn´t work, even installing the latest dependencies @babel/core - probably only works with webpack 2
                            //presets: ["@babel/preset-env"] //can have more or others
                            /**/
                            presets: [
                                ["@babel/preset-env", {
                                  "modules": "commonjs"
                                }]
                            ]
                            
                            /*presets: ["react", , "es2015", "stage-2",
                                ["@babel/preset-env", {
                                  "modules": "commonjs"
                                }]
                            ]*/
                        }
                    }
                ]
            },
            
            //HTML
            {
                test: /\.html$/,
                //exclude: "", //define files not to load
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
                        //publicPath: "imgs", //optional, in case of using a directory with another name
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