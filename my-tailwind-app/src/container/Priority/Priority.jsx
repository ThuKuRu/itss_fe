import React, {useState} from "react";
import SearchBar from "./ComSearchBar/SearchBar";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Button, Form, Header } from "semantic-ui-react";


const Priority = () => {
  const blankuser = {
    "name":"",
    "task":"",
  }

  const [open, setOpen] = useState(false);
  const [action,setAction] = useState('Add');
  const [userdata, setUserdata] = useState([]);
  const [user, setUser] = useState(blankuser);
  const [editIndex, setEditIndex] = useState(null);


  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add')
  }

  const addUser = () => {
    setUserdata([...userdata,user]);
    setUser(blankuser);
    onCloseModal();
  }

  const editUser = (index) => {
    console.log("index",index);
    setAction('Edit');
    const selectedUser = userdata.find((x,i) => i === index);
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal(); 
  }

  const updateUser = () => {
    const newusers = userdata.map((x,i) => {
      if(i === editIndex){
        x = user
      }
      return x
    });
    setUserdata(newusers);
    setUser(blankuser);
    setEditIndex(null);
    onCloseModal();
  }

  const deleteUser = (index) => {
    const newusers = userdata.filter((x,i) => {return i !== index});
    setUserdata(newusers);
  }

  return (
    
    <div >
      <Header className="flex flex-col w-[60vw] h-[10vh] rounded p-2" >
        <SearchBar />
      </Header>
      <hr/>
      
      <div className="flex flex-col w-[80vw] h-fit  rounded pl-3 p-2">
          {userdata.length > 0 && userdata.map((user,index) => (
            <div key={index} className="flex mt-5">
              <div className='grow h-15'>
                <span>
                <h3>{user.name}</h3>
                {user.task} task
                </span>
                <hr className="mt-2" />
              </div>
              <div className='flex-none  h-15'>   
                <Button className='ui button' color="red" onClick={() => editUser(index)}><span>Edit</span></Button>
                <Button className='ui button' color="gray" onClick={() => deleteUser(index)}><span>Delete</span></Button>           
              </div> 
              
            </div>
            
          ))}
          
      </div>
      
      <div className="flex flex-col w-[20vw] h-fit  rounded pl-10 p-2">
        <Button className='ui button' color="red" onClick={onOpenModal}><span>Add User</span></Button>
      </div>
      



      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} User</h2>
        <Form>
        <Form.Input 
                type="text" 
                placeholder="Name User" 
                name="name"
                value={user.name}
                required
                onChange={(e) => setUser({...user,"name":e.target.value})}
            />
            <Form.Input 
                type="text" 
                placeholder="Number Tasks" 
                name="task"
                value={user.task}
                required
                onChange={(e) => setUser({...user,"task":e.target.value})}
            />
          
          {action === 'Add' && <Button className='ui button' color="red" onClick={() => addUser()}>Submit</Button>}
          {action === 'Edit' && <Button className='ui button' color="red" onClick={() => updateUser()}>Update</Button>}
        </Form>
      </Modal>
    
    </div>
  );
};

export default Priority;
