const webpack = require('webpack')
const dotenv = require('dotenv')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin') // ts check spec up!
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

// 개발모드 유무
const isDevMode = process.env.NODE_ENV !== 'production'
const envPath = `./.env.${isDevMode ? 'development' : 'production'}`
dotenv.config({ path: envPath }) // template Title에 필요

console.log(`💻💻💻💻💻💻💻💻💻💻💻💻💻💻 ${isDevMode ? '[ Dev Mode ]' : '[ Product Mode ]'} 💻💻💻💻💻💻💻💻💻💻💻💻💻💻`)

const config = {
  name: 'TodoList_webpack_setting', // 웹팩 설정 이름
  mode: isDevMode ? 'development' : 'production', // development, production
  devtool: !isDevMode ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  entry: {
    // Entry Point
    app: './src/index.tsx',
  },
  output: {
    // Result
    path: path.resolve(__dirname, 'dist'), //빌드 위치
    filename: 'script.js', //웹팩 빌드 후 최종적으로 만들어질 파일
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'imgs/[name].[ext]',
        },
      },
    ],
  },
  devServer: {
    // 개발 서버 설정
    port: 3000,
    hot: true, // 핫 모듈 교체(HMR) 활성화
    compress: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ async: false }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new Dotenv({ path: envPath }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML 템플릿
      title: process.env.TITLE, // HTML 타이틀
      minify: false, // 압축 설정
    }),
  ],
}

// 모드 별 플러그인 추가
if (isDevMode) {
  // 개발모드
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new ReactRefreshWebpackPlugin())
} else {
  // 정적파일 복사 플러그인
  config.plugins.push(
    new CopyPlugin({
      patterns: [
        {
          from: 'public/',
          to: '',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/*.html', '**/*.js'],
          },
        },
      ],
    })
  )
}

module.exports = config
