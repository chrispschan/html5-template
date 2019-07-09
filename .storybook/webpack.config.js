const path = require('path');
const manageEnvironment = require(path.resolve(__dirname, '../src/manageEnvironment.js'));

const options = require(path.resolve(__dirname, '../gulp.options.js'));

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: path.resolve(__dirname, '../src/loader/nunjucks-loader.js'),
            options: {
              globals: {
                PRODUCTION: process.env.NODE_ENV === 'production'
              },
              manageEnvironment: manageEnvironment,
              options: {
                noCache: true
              },
              path: path.resolve(__dirname, '../src/app/'),
              jsBeautifier: options.htmlbeautify
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [ 
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /.*\.stories.function\.js$/,
        include: [
          path.resolve(__dirname, "../src/app")
        ],
        use: [ 
          {
            loader: path.resolve(__dirname, '../src/loader/browserify-loader.js'),
            options: {
              paths: [path.resolve(__dirname, '../node_modules/'), path.resolve(__dirname, '../src/app/')]
            }
          }
        ]
      }
    ],
  }
};
