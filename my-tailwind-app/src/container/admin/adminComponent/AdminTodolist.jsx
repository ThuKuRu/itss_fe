import { useState } from "react";
import PopupDescriptionAdmin from "../../popup/PopupTaskDescriptionAdmin";
function AdminTodoList({todos, setTodos, editTodo,setEditTodo}) {
    const [openPopup, setOpenPopup] = useState(false);
    const [taskId, setTaskId] = useState();
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
            <div className="flex items-center border-b-[1px] border-solid border-gray-200 px-3" key={todo.id}>
                <div className=' flex items-center grow h-14'>
                <input 
                    type="checkbox" 
                    value={todo.title} 
                    onClick={()=>handleComplete(todo)}
                    checked={todo.completed}
                />  
                <span className='pr-20 pl-3' 
                    style={{
                        fontSize: '18px', // Điều chỉnh giá trị này để thay đổi kích thước của chữ
                        textDecoration: todo.completed ? 'line-through' : 'none',
                    }}>{todo.title}</span>
                </div>
                <span className="flex-end" style={{marginRight: "20px", fontWeight: "bold"}}>{todo.username}</span>
                <div className='flex-end'>
                    <button style={{marginLeft:"5px", background: "blue",padding:"5px", borderRadius:"5px", width: "50px", color: "white"}} onClick={()=>{setTaskId(todo.id);setOpenPopup(true)}} >View</button>
                    <button style={{marginLeft:"5px", background: "red",padding:"5px", borderRadius:"5px", width: "50px", color: "white"}} onClick={()=>handleDelete(todo)} >Delete</button>
                    <button style={{marginLeft:"5px", background: "green",padding:"5px", borderRadius:"5px", width: "50px", color: "white"}}  onClick={() => {setPopup1(true);}}>Edit</button>
                </div>
                {openPopup?<PopupDescriptionAdmin taskId={taskId} back={()=>{setOpenPopup(false)}}/>:<></>}        
            </div>
            
        ))

        }
         
    </div>
  )
}

export default AdminTodoList;