import React, { useState } from "react";
import "./employee.css";

import {useGetAlluserQuery,useDeleteUserMutation, useAddUserMutation,useUpdateUserMutation} from '../services/user';

function Employee() {

  const [id, setid] = useState();
  const [name, setname] = useState();
  const [position, setposition] = useState();
  const [office, setoffice] = useState();
  const [salary, setsalary] = useState();

    // Reset
  function resetFields(){
    document.getElementById('name').value='';
    document.getElementById('position').value='';
    document.getElementById('office').value='';
    document.getElementById('salary').value='';
  }

  // Display
  const Employee=useGetAlluserQuery();

  // Add New User 
  const [addUser]=useAddUserMutation();
  const {refetch}=useGetAlluserQuery();
  const user={
    name:name,
    position:position,
    office:office,
    salary:salary
  }
  const AddUser=()=>{
      addUser(user);
      refetch();
      resetFields();
  }

  // Delete
  const [deleteUser]=useDeleteUserMutation(); //accepts a function and a object
  const DeleteUser=async(id)=>{
    await deleteUser(id);
    refetch();
  }

  //Edit
    const [updateUser]=useUpdateUserMutation(); //accepts a function and a object
    const Edit=(emp)=>{
      console.log("u:",emp)
      document.getElementById('id').value=emp._id;
      document.getElementById('name').value=emp.name;
      document.getElementById('position').value=emp.position;
      document.getElementById('office').value=emp.office;
      document.getElementById('salary').value=emp.salary;
      document.getElementById('update').style.display="inline";
      document.getElementById('sbmt').style.display="none";
    }

    //Update

    const Update=async()=>{
      const updateuser={
        id:document.getElementById('id').value,
        name:document.getElementById('name').value,
        position:document.getElementById('position').value,
        office:document.getElementById('office').value,
        salary:document.getElementById('salary').value
      }
      await updateUser(updateuser);
      refetch();
      resetFields();
      document.getElementById('update').style.display='none';
      document.getElementById('sbmt').style.display="inline";

    }


  // useEffect(() => {
  //   // Get
  //   axios
  //     .get("http://localhost:3000/employees")
  //     .then(function (response) {
  //       setemployee(response.data);
  //     })
  // });



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
          id="id"
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
          <button className="sbmt update" onClick={()=>Update()} id="update" placeholder="Submit edit">Update</button>
          <button onClick={AddUser}  className="sbmt" id="sbmt"  placeholder="Submit">Submit</button>
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
            { Employee.data?.map((emp) => {
              return (
                <li className="table-row">
                  <div className="data-width">{emp.name}</div>
                  <div className="data-width">{emp.position}</div>
                  <div className="data-width">{emp.office}</div>
                  <div className="data-width">{emp.salary}</div>
                  <div className="btns">
                    <button className="edit" id="edit" onClick={()=>Edit(emp)} >Edit</button>
                    <button onClick={()=>DeleteUser(emp._id)} >Delete</button>
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
