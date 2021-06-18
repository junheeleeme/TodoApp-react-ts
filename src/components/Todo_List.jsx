const React = require("react");
const {useState, useRef} = React;

const Todo_List = ({todos, doneToggle, todo_edit, todo_delete}) =>{
    const [edit, setEdit] = useState('');
    const todo_list = useRef();
    const list_li = useRef();

    const onClick_del = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt(e.target.parentElement.getAttribute('data-sort'));
        todo_delete(idx);
    }

    const toggle = (e) =>{
        const idx = parseInt(e.target.parentElement.getAttribute('data-sort'));
        doneToggle(idx);
    }

    const onClick_edit = (e) =>{
        e.preventDefault();
        e.stopPropagation();

        const idx = parseInt(e.target.parentElement.getAttribute('data-sort'));
        const select_li = todo_list.current.children[idx];
        const isClass = select_li.classList.contains('edit');
        const edit_input = select_li.children[1];
        const length = todo_list.current.children.length;

        for(let i=0 ; i<length ; i++){
            if(i!==idx){
                todo_list.current.children[i].classList.remove('edit');
            }
        }

        if(!isClass){
            select_li.classList.add('edit');
            edit_input.value = '';
            edit_input.focus();
        }else{
            if(edit_input.value !== ''){
                todo_edit(idx, edit);
                select_li.classList.remove('edit');
            }else{
                select_li.classList.remove('edit');
            }
        }
    }
    
    const onChange_edit = (e) =>{
        setEdit(e.target.value);
    }

    const onKeyPress_edit = (e) =>{
        if(e.charCode === 13){
            
            const idx = parseInt(e.target.parentElement.getAttribute('data-sort'));
            const select_li = todo_list.current.children[idx];
            const edit_input = select_li.children[1];
            const isClass = select_li.classList.contains('edit');
    
            if(edit_input.value !== ''){
                todo_edit(idx, edit);
                edit_input.value = '';   
                select_li.classList.remove('edit');
            }else{
                select_li.classList.remove('edit');
            }
        }
    }

    let list = [];

    todos.forEach( (todo, i) => {
        list.push(
            <li key={i} data-sort={i} className={todo.done}>
                <p className="todo_title" onClick={toggle}>{todo.title}</p>
                <input type="text" className="todo_edit" onChange={onChange_edit} onKeyPress={onKeyPress_edit}/>
                <a href="#" className='edit_btn' onClick={onClick_edit}></a>
                <a href="#" className='del_btn' onClick={onClick_del}></a>
                <span className="todo_date">{todo.date}</span>
            </li>
        )
    });


    return(
        <React.Fragment>
            <ul ref={todo_list} className="todo_list">
                {list}
            </ul>
        </React.Fragment>
    );

}

module.exports = Todo_List;