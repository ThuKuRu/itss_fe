import React, { useContext, useEffect, useState } from "react";
import { CiCircleList } from "react-icons/ci";
import { Header} from "semantic-ui-react";
import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
import { UserContext } from "../../UserContext";
import axios from "axios";
export const useDate = () => {
  
  const locale = 'en';
  const today = new Date();

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

  return {date};
};




const Today = () => {
  const {date} = useDate();
  const user = useContext(UserContext);
  const[input, setInput]=useState("");
  const[todos, setTodos]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:4000/today-tasks", {
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      let dataRaw = res.data;
      let data = dataRaw.map((item)=>{
        return {
          id: item.task_id,
          title: item.task_name,
          completed: false,
        }
      })
      setTodos(data);
    }).catch((err)=>{
      console.log(err)
    });
  }, []);



  return (
  <div>
    <Header className="flex flex-col w-[80vw] h-[10vh] rounded p-10" >
      <div className="flex justify-between">
        <div class="">
          <strong className="font-lagre text-[26px] p-3"> Today </strong> 
          <span style={{color: '#6F6F6F', fontSize:'14px'}}> {date} </span>
        </div>

        <div>
        </div>

        <div className="flex items-center text-center gap-2">
          <CiCircleList className="font-light text-xl "  color="#6F6F6F" />
          <p className=" font-light text-xl " style={{color: '#6F6F6F',fontSize:'14px'}}>View</p>
        </div>
      </div>
    </Header>
    <hr/>
    
      
    <div className="flex flex-col w-[80vw] h-fit  rounded pl-10 p-2">
      <div>
        <TodosList 
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </div>
    <hr />
    <div className="flex flex-col w-[80vw] h-fit  rounded pl-10 p-2">  
      <div>
      <h3>Add new task</h3>
        <TodoForm 
          input={input}
          setInput={setInput}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </div>
  </div>
  );
};

export default Today;
