import { createSlice } from "@reduxjs/toolkit"; // automatically generates action creators and action types that correspond to the reducers and state
import { UsersData } from "../FakeData";
const axios = require("axios").default; 

export const userSlice=createSlice({
    name:"users",
    initialState:{value:UsersData},
    reducers:{
        addUser:(state,action)=>{
            state.value.push(action.payload);
            axios.post("http://localhost:3000/employees", {
                name: action.payload.name,
                position:action.payload.position,
                office:action.payload.office,
                salary: Number(action.payload.salary),
            })
                document.getElementById('name').value='';
                document.getElementById('position').value='';
                document.getElementById('office').value='';
                document.getElementById('salary').value='';
        },
        deleteUser:(state,action)=>{
            console.log(action.payload.id)
            state.value=state.value.filter((user)=>user.id!==action.payload.id)
        },
        getusers:()=>{
              axios.get("http://localhost:3000/employees")
              .then(function (response) {
                  UsersData.push(response.data);
              })
        }
    }
})
export const {addUser,deleteUser} =userSlice.actions;
export default userSlice.reducer;
//User reducer