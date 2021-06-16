const React = require("react");
const Todo_Insert = require("./components/Todo_Add");
const Todo_List = require("./components/Todo_List");
const {useState, useEffect} = React;

const App = () =>{
    const [todos, setTodos] = useState(
        [
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
        ]
    )
    
    const AddTodo = (todo) =>{
        setTodos([
            ...todos,
            {
                title : todo,
                date : getDate(),
                done : 'yet',
                edit : '',
            }
        ]);
    }

    const doneToggle = (idx) =>{

        let temp = [...todos];
    
        temp.forEach( (todo, i) =>{
            
            if( i === parseInt(idx)){
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
            <Todo_Insert AddTodo={AddTodo}/>
            <Todo_List todos={todos} doneToggle={doneToggle}/>
        </main>
    )
}


module.exports = App;