const React = require("react");
const { useState, useRef} = React;

const Todo_List = ({todos, doneToggle}) =>{
    const list_li = useRef();

    const toggle = (e) =>{
        
        const idx = e.target.getAttribute('data-sort');
        doneToggle(idx);
        
    }

    let list = [];

    todos.forEach( (todo, i) => {
        list.push(
            <li ref={list_li} key={i} data-sort={i} className={todo.done + ' ' + todo.edit} onClick={toggle}>
                {todo.title} -
                <span className="todo_date">{todo.date}</span>
            </li>
        )
    });


    return(
        <React.Fragment>
            <ul className="todo_list">
                {list}
            </ul>
        </React.Fragment>
    );

}

module.exports = Todo_List;