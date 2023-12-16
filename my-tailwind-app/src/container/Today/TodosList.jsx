import React,{useState} from 'react'
import PopUpFirst from './PopUpEditToday/PopUpFirst';
import PopupDescription from '../popup/PopupTaskDescription';


const TodosList = ({todos, setTodos, editTodo,setEditTodo}) => {
    const [task, setTask] = useState();

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
    const [openDescriptionPopup, setOpenDecriptionPopup] = useState(false);

    return (
    <div>
        {todos.map((todo)=>(
            <div className="flex items-center border-b-[1px] border-solid border-gray-200 px-3" key={todo.id}>
                <div className=' flex items-center grow h-14'>
                {/* <hr className='mb-3'/> */}
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

                </div>
                <div className='flex-end'>
                    <button className='ui button' style={{marginLeft:"5px", background: "blue", color: "white"}} onClick={()=>{setTask(todo);setOpenDecriptionPopup(true)}} >View</button>
                    <button className='ui button' style={{marginLeft:"5px", background: "red", color: "white"}} onClick={()=>handleDelete(todo)} >Delete</button>
                    <button className='ui button' style={{marginLeft:"5px", background: "green", color: "white"}}  onClick={() => {setPopup1(true);}}>Edit</button>
                </div>
                {/* <div className='flex-none h-14'>    */}
                {/* </div>  */}
                {popup1 && <PopUpFirst setPopup1={setPopup1} />} 
                {openDescriptionPopup && <PopupDescription back={()=>{setOpenDecriptionPopup(false)}} taskName={task.title} taskDescription={task.description} taskDate={task.dueDate} taskPriority={task.priority} />}
                {/* <hr/> */}
                
                    
            </div>
            
        ))

        }
         
    </div>
  )
}

export default TodosList