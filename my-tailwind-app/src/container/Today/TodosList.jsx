import React,{useState} from 'react'
import { Button} from 'semantic-ui-react'
import PopUpFirst from './PopUpEditToday/PopUpFirst';


const TodosList = ({todos, setTodos, editTodo,setEditTodo}) => {

    const handleDelete = ({id}) =>{
        setTodos(todos.filter((todo)=> todo.id !== id))
    };
    const handleComplete = (clickedTodo) => {
        const updatedTodos = todos.map(todo =>
          todo.id === clickedTodo.id ? { ...todo, completed: !todo.completed } : todo
        );
      
        setTodos(updatedTodos);
    };
    
    const [popup1, setPopup1] = useState(false);


    return (
    <div>
        {todos.map((todo)=>(
            <div className="flex" key={todo.id}>
                <div className='grow h-14'>
                <hr className='mb-3'/>
                <input 
                    type="checkbox" 
                    value={todo.title} 
                    onClick={()=>handleComplete(todo)}
                    checked={todo.completed}
                    // onChange={(event)=>event.preventDefault()}
                />  
                <span className='pr-20 pl-3' 
                    style={{
                        fontSize: '18px', // Điều chỉnh giá trị này để thay đổi kích thước của chữ
                        textDecoration: todo.completed ? 'line-through' : 'none',
                    }}>{todo.title}</span>
                <hr className='mt-2'/>
                </div>
                <div className='flex-none h-14'>   
                    <Button className="ui button mb-4  " color='red' onClick={()=>handleDelete(todo)} >Delete</Button>
                    <Button className="ui button mb-4 " color='gray' onClick={() => {setPopup1(true);}}>Edit</Button>
                </div> 
                {popup1 && <PopUpFirst setPopup1={setPopup1} />} 
                <hr/>
                
                    
            </div>
            
        ))

        }
         
    </div>
  )
}

export default TodosList