import React, { useState } from "react";
import "./employee.css";

import {useGetAlluserQuery,useDeleteUserMutation, useCreateUserMutation,useUpdateUserMutation} from '../services/user';
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

  // Display
  const responseInfo=useGetAlluserQuery();

  // delete
  const [deleteUser,responseInfodelete]=useDeleteUserMutation(); //accepts a function and a object

  // Add New User 
  const [newUser,responseInfonew]=useCreateUserMutation(); //accepts a function and a object
  const adduser={
    name:name,
    position:position,
    office:office,
    salary:salary
  }


    const [updateUser,responseInfoupdate]=useUpdateUserMutation(); //accepts a function and a object
    const updateuser={
      name:name,
      position:position,
      office:office,
      salary:salary
    }

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
  //   }

    
  // };

  // Put
  // const edituser=(_id,emp)=>{
  //   editvar=true;
  //   console.log("editemp",emp)
  //   updateid=_id;
  //   console.log(updateid)
  //   // set values to input fields
  //   document.getElementById('name').value=emp.name;
  //   document.getElementById('position').value=emp.position;
  //   document.getElementById('office').value=emp.office;
  //   document.getElementById('salary').value=emp.salary;
  // }
  // Update USer
  // const updateuser=(updateid)=>{
  //   if(editvar){
  //     axios.put(`http://localhost:3000/employees/${updateid}`, {
  //       name:document.getElementById('name').value,
  //       position:document.getElementById('position').value,
  //       office:document.getElementById('office').value,
  //       salary:Number(document.getElementById('salary').value)
  //   })
    // resetFields();
  // }
  // }

  // Delete
  // function deleteuser(_id) {
  //   return axios.delete(`http://localhost:3000/employees/${_id}`).then();
  // }

  return (
    <>
      <div className="formdata">
        <input
          type="text"
          className="idField"
          placeholder="id"
          onChange={(event) => {
            setid(event.target.value);
          }}
        ></input>
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
            editvar ? (<button className="sbmt" placeholder="Submit edit">Update</button>):
            (<button onClick={()=>newUser(adduser)}  className="sbmt" placeholder="Submit">Submit</button>)
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
            { responseInfo.data?.map((emp) => {
              return (
                <li className="table-row">
                  <div className="data-width">{emp.name}</div>
                  <div className="data-width">{emp.position}</div>
                  <div className="data-width">{emp.office}</div>
                  <div className="data-width">{emp.salary}</div>
                  <div className="btns">
                    <button className="edit" onClick={()=>updateUser(emp._id)} >Edit</button>
                    <button onClick={()=>deleteUser(emp._id)} >Delete</button>
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
