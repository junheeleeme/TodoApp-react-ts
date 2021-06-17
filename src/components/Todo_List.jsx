const React = require("react");
const {useState, useRef} = React;

const Todo_List = ({todos, doneToggle, todo_edit, todo_delete}) =>{
    const [edit, setEdit] = useState('');
    const edit_txt = useRef();

    const list_li = useRef();

    const onClick_del = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt(e.target.parentElement.getAttribute('data-sort'));
        todo_delete(idx);
    }

    const toggle = (e) =>{
        const idx = parseInt(e.target.getAttribute('data-sort'));
        doneToggle(idx);
    }

    const onClick_edit = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt(e.target.parentElement.getAttribute('data-sort'));
        const isClass = list_li.current.classList.contains('edit');
        
        if(!isClass){
            list_li.current.classList.add('edit');
            edit_txt.current.value = '';
            edit_txt.current.focus();
        }else{
            list_li.current.classList.remove('edit');
            todo_edit(idx, edit);
        }
        
    }
    
    const onChange_edit = (e) =>{
        setEdit(e.target.value);
    }

    const onKeyPress_edit = (e) =>{
        if(e.charCode === 13){
            const idx = parseInt(e.target.parentElement.getAttribute('data-sort'));
            list_li.current.classList.remove('edit');
            todo_edit(idx, edit);
        }
    }

    let list = [];

    todos.forEach( (todo, i) => {
        list.push(
            <li ref={list_li} key={i} data-sort={i} className={todo.done} onClick={toggle}>
                {todo.title}
                <input ref={edit_txt} type="text" className="todo_edit" onChange={onChange_edit} onKeyPress={onKeyPress_edit}/>
                <a href="#" className='edit_btn' onClick={onClick_edit}></a>
                <a href="#" className='del_btn' onClick={onClick_del}></a>
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