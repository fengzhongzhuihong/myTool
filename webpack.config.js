const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    library: 'thelingAntd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    filename: 'theling-antd.umd.js',
    globalObject: 'this',
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/typescript', '@babel/env', '@babel/react'],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              [
                '@babel/env',
                {
                  loose: true,
                  modules: false,
                },
              ],
              '@babel/react',
            ],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: 'React',
    antd: 'antd',
    moment: 'moment',
  },
};
