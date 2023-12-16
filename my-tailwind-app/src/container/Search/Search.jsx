import React, { memo, useMemo, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useContext, useEffect } from "react";
import TodosList from "../Today/TodosList";

const Search = () => {
  const user = useContext(UserContext);
  const [labels, setLabels] = useState([]);
  const [todos, setTodos] = useState([]);
  const searchRef = useRef();
  const labelRef = useRef();
  const priorityRef = useRef();
  useEffect(()=>{
    axios.get("http://localhost:4000/labels",{
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      setLabels(res.data);
    }).catch((err)=>{
      console.log(err);
    });

    axios.get("http://localhost:4000/upcoming-tasks",{
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      let dataRaw = res.data;
      let data = dataRaw.map((item)=>{
        return {
          id: item.task_id,
          title: item.task_name,
          description: item.description,
          priority: item.priority_id,
          dueDate: item.due_date,
          completed: false,
        }
      })
      setTodos(data);
    }).catch((err)=>{
      console.log(err);
    })

  },[]);
  const search = ()=>{
    axios.get("http://localhost:4000/upcoming-tasks",{
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      let dataRaw = res.data;
      let data = dataRaw.map((item)=>{
        return {
          id: item.task_id,
          title: item.task_name,
          description: item.description,
          priority: item.priority_id,
          dueDate: item.due_date,
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

  return <div className=" flex flex-col w-[78vw]">
    <div className="flex items-center">
    <input className=" basis-8/12" ref={searchRef} style={{border:"1px solid gray", borderRadius:"5px", padding: "10px"}} type="text" placeholder="Search task name"/>
    <select className=" basis-2/12" ref={priorityRef} style={{border:"1px solid gray", borderRadius:"5px", padding: "10px", marginLeft:"10px"}} name="priority">
      <option value={1}>priority 1</option>
      <option value={2}>priority 2</option>
      <option value={3}>priority 3</option>
      <option value={4}>priority 4</option>
    </select>
    <label/>
    <select className=" basis-1/12" ref={labelRef} style={{border:"1px solid gray", borderRadius:"5px", padding: "10px", marginLeft:"10px"}} name="label">
      {labels.map((item)=>{
        return (<option value={item.label_id}>{item.label_name}</option>)
      })}
    </select>
    <button className="ui button font-semibold" onClick={search} style={{background:"blue", color:"white", display:"inline", marginLeft:"10px"}}> Search </button>
    </div>
    <div className="result  basis-1/12" style={{ marginTop: "50px"}}>
      {todos.length == 0? <p style={{textAlign:"center", fontSize:"20px", width:"500px", color:"gray"}}>NOT FOUND</p>:<TodosList todos={todos} setTodos={setTodos} editTodo={()=>{}} setEditTodo={()=>{}}/>}
    </div>
  </div>;
};

export default Search;
