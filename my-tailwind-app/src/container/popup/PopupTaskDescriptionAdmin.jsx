import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
function PopupDescriptionAdmin({taskId, back}) {
    const user = useContext(UserContext);
    const [task, setTask] = useState({});
    useEffect(()=>{
        axios.get("http://localhost:4000/admin/task/"+taskId, {
            headers: {
                authorization: user.jwt
              }
        }).then((res)=>{
            let data = res.data;
            let user = data.user;
            let task = data.task;
            let date = new Date(task.due_date)
            setTask({
                user: {
                    userId: user.user_id,
                    userName: user.user_name,
                },
                task: {
                    taskName: task.task_name,
                    taskDescription: task.description,
                    dueDate: date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(),
                    priority: "Priority "+ task.priority_id,
                }
            })
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    const popupContainer ={
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        zIndex: 1000,
        padding: '10px',
        borderRadius: '12px',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 4px',
        width: "600px",
        height: "500px",
        padding: "0",
        
    }
    const popupBackground = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 1000
      }
    return ( 
        
        <div style={popupBackground}>
            <div style={popupContainer}>
                <button style={{position:"absolute", top: "10px", left: "10px", color: "blue", padding:"5px", border:"1px solid gray", borderRadius: "5px"}} onClick={()=>{back()}}>Back</button>
                {
                    task.task && <div style={{display: "flex"}}>
                    <div style={{margin: "0",width: "400px", height: "500px", borderRight: "2px solid gray", padding: "40px 30px 30px 30px"}}>
                        <h2>{task.task.taskName}</h2>
                        <p>{task.task.taskDescription}</p>
                    </div>
                    <div style={{width: "200px", background: "gray", borderRadius: "0px 12px 12px 0px", padding: "40px 20px 20px 20px"}}>
                        <span style={{fontWeight:"bold", color: "blue"}}>Due date</span>
                        <p style={{color: "white"}}>{task.task.dueDate}</p>
                        <span style={{fontWeight: "bold", color: "blue"}}>Priority</span>
                        <p style={{color: "white"}}>{task.task.priority}</p>
                        <span style={{fontWeight: "bold", color: "blue"}}>User</span>
                        <p style={{color: "white"}}>{task.user.userName}</p>
                    </div>
                </div> 
                }
            </div>
        </div>
     );
}

export default PopupDescriptionAdmin;