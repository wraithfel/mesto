const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/components/index.js", // точка входа
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // очищает папку dist при каждой сборке
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // откуда брать HTML
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  optimization: {
    minimizer: [
      "...", // оставляем встроенную минификацию JS
      new CssMinimizerPlugin(), // минификация CSS
    ],
  },
  devServer: {
    static: "./dist",
    open: true,
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/, // обрабатываем .js файлы
        exclude: /node_modules/, // не трогаем зависимости
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              "...",
              { tag: "img", attribute: "src", type: "src" },
              { tag: "div", attribute: "style", type: "src" },
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][hash][ext][query]", // картинки будут в папке images
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][hash][ext][query]", // шрифты будут в папке fonts
        },
      },
    ],
  },
};
