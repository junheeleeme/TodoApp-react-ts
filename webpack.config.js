const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    name : 'TodoList_webpack_setting', // 웹팩 설정 이름
    mode : 'development', //실서비스 : Production
    devtool : 'eval',
    resolve : {
        extensions : ['.js', '.jsx']
    },
    entry:{ // 합쳐질 파일 요소들 입력
        app : ['./src/index.jsx'], 
    },
    output:{// 최종적으로 만들어질 js
        path: path.join(__dirname, '/dist'), //빌드 위치
        filename : 'bundle.js',  //웹팩 빌드 후 최종적으로 만들어질 파일
        publicPath: './', //서버 배포했을때 필요
    },
    module : { //모듈 연결 설정
        rules : [{
            test: /\.jsx?/, // 대상 설정 정규식
            loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins : [ '@babel/plugin-proposal-class-properties']
            },
        },
        { //style-loader, css-loader 규칙 설정
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
                name: 'imgs/[name].[ext]', //이미지는 img폴더 따로 생성해서 저장
            },
        }]
    },
    devServer : {
        compress: true,
        contentBase: './dist',
        hot : true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
            template: './public/index.html', // select not bundled html
            filename:'./index.html'
        })
    ],
}