import React, { useEffect, useState } from "react";
import "./employee.css";

import { useSelector,useDispatch } from "react-redux";//read current value of state from store
import { addUser,deleteUser } from "../features/Users";
const axios = require("axios").default; 

var editvar;
var updateid;

function Employee() {
  const [id, setid] = useState();
  const [name, setname] = useState('');
  const [position, setposition] = useState('');
  const [office, setoffice] = useState('');
  const [salary, setsalary] = useState('');
  const [employee, setemployee] = useState([]);

  const userlist=useSelector((state)=>(state.users.value));
  const usedispatch=useDispatch();

  // useEffect(() => {
  //   // Get
  //   axios
  //     .get("http://localhost:3000/employees")
  //     .then(function (response) {
  //       setemployee(response.data);
  //     })
  // });

  // Reset
  // function resetFields(){
  //   document.getElementById('name').value='';
  //   document.getElementById('position').value='';
  //   document.getElementById('office').value='';
  //   document.getElementById('salary').value='';
  // }

  // Post
  // const addUser = () => {
  //   axios
  //     .post("http://localhost:3000/employees", {
  //       name: name,
  //       position: position,
  //       office: office,
  //       salary: Number(salary),
  //     })
  //     resetFields();

    
  // };

  // Put
  const edituser=(_id,emp)=>{
    editvar=true;
    console.log("editemp",emp)
    updateid=_id;
    console.log(updateid)
    // set values to input fields
    document.getElementById('name').value=emp.name;
    document.getElementById('position').value=emp.position;
    document.getElementById('office').value=emp.office;
    document.getElementById('salary').value=emp.salary;
  }
  // Update USer
  const updateuser=(updateid)=>{
    if(editvar){
      axios.put(`http://localhost:3000/employees/${updateid}`, {
        name:document.getElementById('name').value,
        position:document.getElementById('position').value,
        office:document.getElementById('office').value,
        salary:Number(document.getElementById('salary').value)
    })
    // resetFields();
  }
  }

  // Delete
  // function deleteuser(_id) {
  //   return axios.delete(`http://localhost:3000/employees/${_id}`).then();
  // }

  return (
    <>
      <div className="formdata">
        {/* <input
          type="text"
          className="idField"
          placeholder="id"
          onChange={(event) => {
            setid(event.target.value);
          }}
        ></input> */}
        <input
          type="text"
          placeholder="Full name"
          id="name"
          onChange={(event) => {
            setname(event.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Position"
          id="position"
          onChange={(event) => {
            setposition(event.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Office"
          id="office"
          onChange={(event) => {
            setoffice(event.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Salary"
          id="salary"
          onChange={(event) => {
            setsalary(event.target.value);
          }}
        ></input>
        <div>
          {
            editvar ? (<button onClick={()=>updateuser(updateid)} className="sbmt" placeholder="Submit edit">Update</button>):
            (<button onClick={()=>{usedispatch(addUser({id:userlist[userlist.length-1].id+1,name:name,position:position,office:office,salary:salary}))}} className="sbmt" placeholder="Submit">Submit</button>)
          }
        </div>
  
       
      </div>

      <div className="container">
        <h2>User Data</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="data-width">Name</div>
            <div className="data-width">Position</div>
            <div className="data-width">Office</div>
            <div className="data-width">Salary</div>
            <div className="data-width">Actions</div>
          </li>
          <>
            {userlist.map((emp) => {
              return (
                <li className="table-row">
                  <div className="data-width">{emp.name}</div>
                  <div className="data-width">{emp.position}</div>
                  <div className="data-width">{emp.office}</div>
                  <div className="data-width">{emp.salary}</div>
                  <div className="btns">
                    <button className="edit" onClick={()=>edituser(emp.id,emp)}>Edit</button>
                    <button onClick={() =>usedispatch(deleteUser({id:emp.id})) }>Delete</button>
                  </div>
                </li>
              );
            })}
          </>
        </ul>
      </div>
    </>
  );
}
export default Employee;
