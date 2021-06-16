const React = require("react");
const {useState, useRef} = React;

const Todo_Insert = ({AddTodo}) =>{
    const [Todo, setTodo] = useState('insert');
    const input_txt = useRef();

    onchange_input = (e) => {
        setTodo(e.target.value);
    }

    onSubmit_todo = (e) =>{
        e.preventDefault();
        const val = input_txt.current.value;

        if( !(val === '') ){
            AddTodo(input_txt.current.value);
            input_txt.current.value = '';
            input_txt.current.focus();
        }       
            
    }


    return(
        <React.Fragment>
            <form action="" className="todo_insert">
                <input type="text" className="todo_input" onChange={onchange_input} ref={input_txt}/>
                <button className="insert_btn" onClick={onSubmit_todo} onSubmit={onSubmit_todo}>+</button>
            </form>
        </React.Fragment>
    );
}


module.exports = Todo_Insert;