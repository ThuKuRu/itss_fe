import React, {useRef, useState } from "react";
import axios from "axios";
import { useContext, useEffect } from "react";
import TodosList from "../../Today/TodosList";
import { UserContext } from "../../../UserContext";
import AdminTodoList from "../adminComponent/AdminTodolist";
const SearchForAdmin = () => {
  const user = useContext(UserContext);
  const [labels, setLabels] = useState([]);
  const [todos, setTodos] = useState([]);
  const searchRef = useRef();
  const labelRef = useRef();
  const priorityRef = useRef();
  useEffect(()=>{
    axios.get("http://localhost:4000/admin/labels",{
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      setLabels(res.data);
    }).catch((err)=>{
      console.log(err);
    });

    axios.get("http://localhost:4000/admin/all-tasks",{
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      let dataRaw = res.data;
      let data = dataRaw.map((item)=>{
        return {
          id: item.task_id,
          title: item.task_name,
          priority: item.priority_id,
          username: item.user_name,
          completed: false,
        }
      })
      setTodos(data);
    }).catch((err)=>{
      console.log(err);
    })

  },[]);
  const search = ()=>{
    axios.get("http://localhost:4000/admin/all-tasks",{
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      let dataRaw = res.data;
      let data = dataRaw.map((item)=>{
        return {
          id: item.task_id,
          title: item.task_name,
          priority: item.priority_id,
          username: item.user_name,
          completed: false,
        }
      })
      let newTodos = data.filter((item)=>{
        return item.title.includes(searchRef.current.value) && item.priority + "" === priorityRef.current.value
      })
      setTodos(newTodos);
    }).catch((err)=>{
      console.log(err);
    })
  }

  return <div>
    <div className="search" style={{marginLeft:"100px"}}>
    <input ref={searchRef} style={{border:"1px solid gray", borderRadius:"5px", padding: "10px", width:"300px"}} type="text" placeholder="Search task name"/>
    <select ref={priorityRef} style={{border:"1px solid gray", borderRadius:"5px", padding: "10px", marginLeft:"10px", marginTop: "10px"}} name="priority">
      <option value={1}>priority 1</option>
      <option value={2}>priority 2</option>
      <option value={3}>priority 3</option>
      <option value={4}>priority 4</option>
    </select>
    <label/>
    <select ref={labelRef} style={{border:"1px solid gray", borderRadius:"5px", padding: "10px", marginLeft:"10px", marginTop: "10px"}} name="label">
      {labels.map((item)=>{
        return (<option value={item.label_id}>{item.label_name}</option>)
      })}
    </select>
    <button onClick={search} style={{background:"blue", color:"white", padding:"10px", borderRadius:"5px", display:"inline", marginLeft:"10px"}}> Search </button>
    </div>
    <div className="result" style={{marginLeft:"100px", marginTop: "50px"}}>
      {todos.length == 0? <p style={{textAlign:"center", fontSize:"20px", width:"500px", color:"gray"}}>NOT FOUND</p>:<AdminTodoList todos={todos} setTodos={setTodos} editTodo={()=>{}} setEditTodo={()=>{}}/>}
    </div>
  </div>;
};

export default SearchForAdmin;
