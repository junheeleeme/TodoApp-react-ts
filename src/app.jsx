const React = require("react");
const Todo_Logo = require("./components/Todo_Logo");
const Todo_Add = require("./components/Todo_Add");
const Todo_List = require("./components/Todo_List");
const {useState, useEffect} = React;

const App = () =>{
    const [todos, setTodos] = useState([]);
            // {   
            //     title : '공부하기',
            //     date : '2021-06-16',
            //     done : 'yet',
            //     edit : '',
            // },
            // {
            //     title : '운동하기',
            //     date : '2021-06-16',
            //     done : 'done',
            //     edit : 'edit'
            // }
    
    const todo_add = (todo) =>{

        const temp = {
                title : todo,
                date : getDate(),
                done : 'yet',
        };

        setTodos([
            ...todos,
            temp
        ]);

    }
    
    const todo_delete = (idx) =>{

        const temp = [...todos];
        temp.splice(idx, 1);
        setTodos([...temp]);
    
    }
    
    const todo_edit = (idx, todo) => {
        
        const temp = [...todos];
        temp[idx].title = todo;
        temp[idx].date = getDate();

        setTodos([...temp]);
    }

    const doneToggle = (idx) =>{

        const temp = [...todos];
    
        temp.forEach( (todo, i) =>{
            
            if( i === idx){
                if(todo.done === 'yet'){
                    todo.done = 'done';
                }else{
                    todo.done = 'yet'; 
                }
            }
        })
        setTodos([...temp]);
    }

    const getDate = () => { //날짜 시간 구하기
        const time = new Date() 
        const year = time.getFullYear();
        const month = (time.getMonth()+1).toString.length === 1 ? ('0' + (time.getMonth()+1)) : (time.getMonth()+1);
        const date =  time.getDate();
        const todo_Date = year + '-' + month + '-' + date + ' / ' + time.getHours() + ':' + time.getMinutes();

        return todo_Date;
    }


    return(
        <main className="todo_main">
            <Todo_Logo/>
            <Todo_Add todo_add={todo_add}/>
            <Todo_List todos={todos} doneToggle={doneToggle} todo_edit={todo_edit} todo_delete={todo_delete}/>
        </main>
    )
}


module.exports = App;