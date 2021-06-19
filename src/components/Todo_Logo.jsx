const React = require("react");
const { memo } = require("react");

const Todo_Logo = memo( ()=> {

    return(
        <React.Fragment>
            <div className="todo_header">
                <h1>Todo List</h1>
            </div>
        </React.Fragment>
    );

})


module.exports = Todo_Logo;