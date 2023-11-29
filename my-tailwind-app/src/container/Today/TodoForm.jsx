import React, { useContext, useRef } from "react";
import {v4 as uuidv4} from "uuid";
import { Form,Button,Dropdown } from 'semantic-ui-react'
import axios from "axios";
import { UserContext } from "../../UserContext";


const TodoForm = ({input,setInput,todos,setTodos}) => {
  const user = useContext(UserContext);
    const descriptionRef = useRef();
    const priorityRef = useRef();
    const onInputChange =(event) =>{setInput(event.target.value);};
    const onFormSubmit = (event) =>{
        event.preventDefault();

        let today = new Date();
        console.log(priorityRef.current);
        axios.put("http://localhost:4000/task",{
            taskName: input,
            description: descriptionRef.current.value,
            dueDate: today.getFullYear().toString() + "-"+(today.getMonth()+1).toString()+"-"+today.getDate().toString()+" "+ today.getHours().toString()+":"+today.getMinutes().toString()+":"+today.getSeconds().toString(),
            priorityId: priorityRef.current.state.value,
            labelId: 1
        }, {
            headers: {
                authorization: user.jwt
              },
        }).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            console.log(err);
        })    
        setTodos([...todos,{id:uuidv4(), title:input , completed:false }]);
        setInput(""); 

                 
    };


    const lvOptions = [
        { key: 'Important',
        text: 'Priority 1',
        value: 1,
        label: { color: 'red', empty: true, circular: true},},
        { key: 'Less Important',
        text: 'Priority 2',
        value: 2,
        label: { color: 'yellow', empty: true, circular: true },},
        { key: 'Normal',
        text: 'Priority 3',
        value: 3,
        label: { color: 'blue', empty: true, circular: true },},
        { key: 'UnImportant',
        text: 'Priority 4',
        value: 4,
        label: { color: '', empty: true, circular: true },},
      ];
    
    
      return (
    
        <Form onSubmit={onFormSubmit} >
            <Form.Input 
                type="text" 
                placeholder="Task name" 
                className="task-input"
                value={input}
                required
                onChange={onInputChange}
            />
            <input 
                type="text" 
                placeholder="Description" 
                className="task-input"
                ref={descriptionRef}
            />
            <div className="flex flex-row mt-4 gap-2">
                <Dropdown 
                    className="basis-2/3"
                    clearable 
                    options={lvOptions} 
                    ref={priorityRef}
                    defaultValue={lvOptions[0].value} 
                    selection   
                />
            
                <Button className="ui button basis-1/6" style={{padding:'5px'}} color="gray" >Cancel</Button>
                <Button className="ui button basis-1/4" style={{padding:'5px'}} color="red" type="submit" >Add</Button>

            </div>
           
        </Form>
    )
}

export default TodoForm