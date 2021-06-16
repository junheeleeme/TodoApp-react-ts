const React = require("react");
const ReactDom = require("react-dom");
const App = require("./App");
import style from './app.css';

ReactDom.render(
        <App/>, document.querySelector("#root")
);