import React, { useState } from "react";
import "./employee.css";
import Button from "@mui/material/Button";

import {
  useGetAlluserQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
} from "../services/user";
import { useEffect } from "react";

const Employee = () => {
  const [id, setid] = useState();
  const [name, setname] = useState();
  const [position, setposition] = useState();
  const [office, setoffice] = useState();
  const [salary, setsalary] = useState();
  const [employee, setemployee] = useState();

  // Reset
  const resetFields=()=> {
    setname("");
    setposition("");
    setoffice("");
    setsalary("");
  }

  // Display
  const { data, refetch } = useGetAlluserQuery();
  useEffect(() => {
    setemployee(data);
  }, [data]);

  // Add New User
  const [addUser] = useAddUserMutation();
  const user = {
    name: name,
    position: position,
    office: office,
    salary: salary,
  };
  const AddUser = async () => {
    await addUser(user);
    refetch();
    resetFields();
  };

  // Delete
  const [deleteUser] = useDeleteUserMutation(); //accepts a function and a object
  const DeleteUser = async (id) => {
    await deleteUser(id);
    refetch();
  };

  //Edit
  const [updateUser] = useUpdateUserMutation(); //accepts a function and a object
  const Edit = (emp) => {
    setid(emp._id);
    setname(emp.name);
    setposition(emp.position);
    setoffice(emp.office);
    setsalary(emp.salary);
    document.getElementById("update").style.display = "inline";
    document.getElementById("sbmt").style.display = "none";
  };

  //Update

  const Update = async () => {
    const updateuser = {
      id: id,
      name: name,
      position: position,
      office: office,
      salary: salary,
    };
    await updateUser(updateuser);
    refetch();
    resetFields();
    document.getElementById("update").style.display = "none";
    document.getElementById("sbmt").style.display = "inline";
  };

 

  return (
    <>
      <form className="formdata">
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
          value={name}
          onChange={(event) => {
            setname(event.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Position"
          id="position"
          value={position}
          onChange={(event) => {
            setposition(event.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Office"
          id="office"
          value={office}
          onChange={(event) => {
            setoffice(event.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Salary"
          id="salary"
          value={salary}
          onChange={(event) => {
            setsalary(event.target.value);
          }}
        ></input>
        <div>
          <button
            className="sbmt update"
            onClick={() => Update()}
            id="update"
            placeholder="Submit edit"
          >
            Update
          </button>
          <Button
            className="sbmt"
            id="sbmt"
            style={{ "margin-top": "30px" }}
            onClick={AddUser}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>

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
            {employee?.map((emp) => {
              return (
                <li className="table-row">
                  <div className="data-width">{emp.name}</div>
                  <div className="data-width">{emp.position}</div>
                  <div className="data-width">{emp.office}</div>
                  <div className="data-width">{emp.salary}</div>
                  <div className="btns">
                    <Button
                      color="success"
                      className="edit"
                      id="edit"
                      onClick={() => Edit(emp)}
                      variant="contained"
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      style={{ "margin-left": "5px" }}
                      onClick={() => DeleteUser(emp._id)}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              );
            })}
          </>
        </ul>
      </div>
    </>
  );
};
export default Employee;
